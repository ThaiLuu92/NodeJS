import fs from "fs";

export function parseQueryConditions(query) {
  if (query) {
    return query.split("&").map((condition) => {
      const data = condition.split("=");
      return { key: data[0], value: decodeURIComponent(data[1]) };
    });
  } 
}


export function filterDataByConditions(dataArray, conditions) {
  if (conditions && conditions.length > 0) {
    return dataArray.filter((data) => {
      return conditions.find(
        (condition) => condition.value == data[condition.key]
      );
    });
  } else {
    // Trả về toàn bộ dataArray khi không có conditions
    return dataArray;
  }
}

export function handleRequest(req, res, query, dataFile) {
  // Bước 1: Trích xuất điều kiện từ query string
  const conditions = parseQueryConditions(query);
  // Bước 2: Đọc dữ liệu từ tệp JSON "courses.json"
  const fileDataJSON = fs.readFileSync(dataFile, "utf8");
  // Bước 3: Phân tích dữ liệu thành một mảng JavaScript
  const dataArray = JSON.parse(fileDataJSON);
  // Bước 4: Sử dụng hàm  để lọc dữ liệu dựa trên các điều kiện
  const dataFilter = filterDataByConditions(dataArray, conditions);
  // Bước 5: Chuyển đổi kết quả thành chuỗi JSON
  const dataFilterJSON = JSON.stringify(dataFilter);
  // Bước 6: Gửi kết quả về khách hàng
  res.write(dataFilterJSON);
}