import fs from "fs";
import querystring from "querystring";

export function handleLoginRequest(req, res) {
  let data = "";
  req
    .on("error", (err) => {
      console.log(err);
    })
    .on("data", (chunk) => {
      data += chunk.toString();
    })
    .on("end", () => {
      const loginUser = querystring.parse(data);
      const usersDataJSON = fs.readFileSync("src/models/users.json", "utf8");
      const users = JSON.parse(usersDataJSON);

      console.log(users);

      const checkLoginUser = users.find((user) => {
        return (
          user.email === loginUser.email && user.password === loginUser.password
        );
      });

      if (checkLoginUser) {
        const successLoginJSON = {
          success: true,
          message: "Đăng nhập thành công",
          userLogin: checkLoginUser,
        };
        const successLogin = JSON.stringify(successLoginJSON);
        res.write(successLogin);
      } else {
        const errorLoginJSON = {
          success: false,
          message: "Email hoặc mật khẩu không đúng",
        };
        const errorLogin = JSON.stringify(errorLoginJSON);
        res.write(errorLogin);
      }
      res.end();
    });
}
