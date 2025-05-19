import requests
from bs4 import BeautifulSoup
import os

# 返回表格裡的資料，除了時間以及上課地點，其餘遇到英文都會break
def get_table_data(url):
    # 發送一個 GET 請求，獲取網頁內容
    response = requests.get(url)
    # 使用 Beautiful Soup 解析 HTML 代碼
    soup = BeautifulSoup(response.content, 'html.parser')
    title = soup.find('h1').get_text(separator=" ", strip=True).split(':')
    department = title[1].strip()
    # print(soup)
    # 找到網頁中所有的 table 標籤
    table_elements = soup.find_all('table')
    data = []
    for table in table_elements:
        table_data = []
        # 遍歷每個 tr 標籤
        for tr in table.find_all('tr'):
            row_data = []
            # 遍歷每個 td 標籤
            i = 0
            for td in tr.find_all('td'):
                # 提取 td 標籤中的文字內容
                a = td.text
                b = str()
                if i == 8 or i == 9 or i == 1:
                    b = a
                elif i != 8 and i != 9:
                    for font in td.find_all('font'):
                        if len(font.contents) > 0:
                            b = font.contents[0]
                        break
                row_data.append(b)
                i += 1
            if row_data:
                table_data.append(row_data)
        if table_data:
            data.append(table_data)
        if data:
            data = data[0]
        else:
            data = []
        Rdata = {"department":department, "data": data}
    return Rdata


# 把主頁面裡的所有連結都抓出來，因為目前只有91個課程網頁，後面都是重複的，因此只傳回前91個
def get_a_link(url):
    
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    links = []
    i = 0
    for link in soup.find_all('a'):
        href = link.get('href')
        i += 1
        if href:
            links.append(href)
    counter = 0
    for i in links:
        if not i.endswith(".html"):
            break
        counter += 1
    links = links[1:counter]
    return links

if __name__ == "__main__":
    url1 = os.getenv("CCU_COURSE_URL")
    links = get_a_link(url1)
    # 在所有的子網址上爬取資料
    for j in links:
        url = url1 + str(j)
        data = get_table_data(url)
        print(data)