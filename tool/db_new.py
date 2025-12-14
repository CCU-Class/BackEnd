import mysql.connector
import psycopg2
import pandas as pd
import os
import sys
import argparse
from dotenv import load_dotenv

# 1. 設定參數解析 (Argument Parsing)
parser = argparse.ArgumentParser(description="Import course data from Excel to Database.")
parser.add_argument('-t', '--test', action='store_true', help="Run in test mode (print data only, no DB write).")
args = parser.parse_args()

# 載入環境變數
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# 設定資料庫連線變數
usingDB = os.getenv("USING_DATABASE")
table_name = os.getenv("MYSQL_COURSE_TABLE")

conn = None
cur = None

# 2. 資料庫連線邏輯 (測試模式跳過連線)
if args.test:
    print("==========================================")
    print(" 啟動測試模式 (TEST MODE) - 不寫入資料庫 ")
    print("==========================================")
else:
    try:
        if usingDB == "mysql":
            conn = mysql.connector.connect(
                host=os.getenv("MYSQL_HOST"),
                port=os.getenv("MYSQL_PORT"),
                user=os.getenv("MYSQL_USER"),
                passwd=os.getenv("MYSQL_PASSWORD"),
                db=os.getenv("MYSQL_DATABASE"),
            )
            cur = conn.cursor(dictionary=True)
        elif usingDB == "postgre":
            conn = psycopg2.connect(os.getenv("DATABASE_URL"), sslmode='require')
            cur = conn.cursor()
        else:
            print("Error: USING_DATABASE not set or invalid.")
            sys.exit(1)
            
        print(f"Connected to {usingDB} database successfully.")

    except Exception as ex:
        print(f"Database Connection Error: {ex}")
        sys.exit(1)

# ---------------------------------------------------------
# 主程式邏輯
# ---------------------------------------------------------

try:
    # 讀取 Excel 檔案
    xlsx_file_path = 'out.xlsx' 
    
    if not os.path.exists(xlsx_file_path):
        print(f"Error: File '{xlsx_file_path}' not found.")
        sys.exit(1)

    print(f"Reading Excel file: {xlsx_file_path} ...")
    
    # 讀取 Excel (強制轉字串)
    df = pd.read_excel(xlsx_file_path, dtype=str)
    df = df.fillna('')

    # 初始化資料庫狀態 (測試模式跳過)
    if not args.test:
        print("Marking all courses as deprecated...")
        cur.execute(f"UPDATE {table_name} SET deprecated = true")
    
    correct_num = 0
    error_num = 0
    
    print(f"Processing {len(df)} rows from Excel...")

    # 遍歷資料
    for index, row in df.iterrows():
        try:
            # 資料清洗與變數對應
            grade = row['年級'].strip()
            department = row['開課單位'].strip()
            course_id = row['科碼'].strip()
            class_name = row['科目名稱'].strip().split('\n')[0]  # 只取科目名稱的第一部分
            credit = row['學分數'].strip()
            teacher = row['授課教師'].strip()
            class_time = row['上課時間'].strip()
            class_room = row['上課教室'].strip()
            
            teacher = teacher.replace(',', ' ')  # 將逗號替換成空格

            # 3. 測試模式：印出資料並跳過後續 SQL
            if args.test:
                print(f"[Row {index+2}]")
                print(f"  系所: {department}, 年級: {grade}")
                print(f"  課號: {course_id}, 課名: {class_name}")
                print(f"  老師: {teacher}, 學分: {credit}")
                print(f"  時間: {class_time}, 教室: {class_room}")
                print("-" * 30)
                correct_num += 1
                continue # 跳過資料庫操作

            # 資料庫操作 (非測試模式才執行)
            
            # 檢查資料是否存在
            check_sql = f"""
                SELECT * FROM {table_name} 
                WHERE id = %s 
                AND class_name = %s 
                AND class_time = %s 
                AND class_room = %s 
                AND credit = %s 
                AND department = %s 
                AND grade = %s 
                AND teacher = %s
            """
            params = (course_id, class_name, class_time, class_room, credit, department, grade, teacher)
            
            cur.execute(check_sql, params)
            existing_record = cur.fetchone()

            if existing_record:
                # 恢復資料 (取消 deprecated)
                update_sql = f"""
                    UPDATE {table_name} 
                    SET deprecated = false 
                    WHERE id = %s 
                    AND class_name = %s 
                    AND class_time = %s 
                    AND class_room = %s 
                    AND credit = %s 
                    AND department = %s 
                    AND grade = %s 
                    AND teacher = %s
                """
                cur.execute(update_sql, params)
            else:
                # 插入新資料
                insert_sql = f"""
                    INSERT INTO {table_name} 
                    (department, grade, id, class_name, teacher, class_time, class_room, credit, deprecated) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, false)
                """
                insert_params = (department, grade, course_id, class_name, teacher, class_time, class_room, credit)
                cur.execute(insert_sql, insert_params)
            
            correct_num += 1

        except Exception as e:
            print(f"Error on Excel row {index + 2}: {e}")
            error_num += 1

    # 4. 提交交易 (非測試模式才執行)
    if not args.test:
        conn.commit()
        print("Transaction committed.")

    print(f"--------------------------------------------------")
    mode_str = "TEST MODE" if args.test else "DB MODE"
    print(f"[{mode_str}] Total Processed: {len(df)}")
    print(f"Success: {correct_num}")
    print(f"Errors: {error_num}")

except Exception as e:
    print(f"Critical Error: {e}")
    if conn and not args.test:
        conn.rollback()
finally:
    if cur:
        cur.close()
    if conn:
        conn.close()
    if not args.test and conn:
        print("Database connection closed.")