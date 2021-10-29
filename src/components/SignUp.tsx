import React from "react";
import { Form, Input, Button } from "antd";
import api from "../utils/api";
import { useHistory } from "react-router";
import { showError, showSuccess } from "../utils/showAlert";

function SignUp() {
  //Validasyon mesajları
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  //Label ayarları
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  //Route yönlendirmesi için ekledim
  const history = useHistory();

  //Form submit olduğunda değerler obje olarak values içerisinde gelecek
  const onFinish = async (values: any) => {
    try {
      //axios tarafında oluşturduğum api.ts dosyasıyle post isteği yapıyorum
      await api().post("/users/register", values);

      //Alert mesajı gösteriyoruz
      showSuccess("Kayıt işlemi başarıyla gerçekleşti");

      //history aracılığıyla login sayfasına gönderiyorum
      //Kişiyi bu sayfadan yönlendirdiğimiz için ona mesaj göstermek isteyebiliriz
      history.push("/login", { newSignUp: true });
    } catch (error) {
      //api isteği sırasında hata olursa console a yazdırıyoruz
      console.error(error);

      //Alert mesajı gösteriyoruz
      //response.data.errorMessage api den gelen mesaj
      showError((error as any).response.data.errorMessage);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <h2 style={{ textAlign: "center", marginBottom: 15 }}>Register</h2>
      <Form.Item name="username" label="User Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please into your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="full_name" label="Full Name">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
