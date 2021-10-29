import { useEffect } from "react";
import { Form, Input, Button, Checkbox, Result } from "antd";
import { showError, showSuccess } from "../utils/showAlert";
import { useHistory, useLocation } from "react-router";
import api from "../utils/api";
import { LoginForm } from "../types/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { AppState } from "../store";

function Login() {
  //url üzerinden gelen dataları handle edebiliyoruz
  //state içerisinde yer alan newSignUp elamanına ulaşabilmek için type tanımladık
  const location = useLocation<{ newSignUp?: boolean }>();

 //Route Yönlendirme işlemleri için
 const history=useHistory();

  //Action lara erişmek için kullanıyoruz
  const dispatch = useDispatch();

  //Redux State erişimi için
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  //lifecycle içerisinde error değişimini gözlemleyerek uyarı mesajı veriyorum
  useEffect(() => {
    //State içerisin de bir hata var ise gösteriyoruz
    error && showError(error);
  }, [error]);

  //Lifecycle içerisinde data.username state ni izliyorum
  useEffect(() => {
    //data.username dolu ise başarılı yanıtını dönüyorum
     data.username && showSuccess(`Başarıyla giriş yaptınız`);
  }, [data.username]);

  //useEffect in ikinci parametresinin durumu onu hangi lifecycle çalışacağını belirler.
  //biz bu parametreyi kullanmadığımız zaman sürekli çalışır
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
      //Token var ise kullanıcı giriş yapmış demektir.Onu direkt anasayfaya yönlendiriyoruz
      history.push("/");
    }
  });

  //Submit işlemi
  const onFinish = (values: LoginForm) => {
    //Redux tarafında ki login metodunu kullanarak api ye istek atıyorum
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    showError(errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* Signup componentinden buraya history aracılığıyla mesaj gönderdik */}
      {/* state içerisinde newSignUp olmayabilir bundan dolayı soru işareti ekledim */}
      {location.state?.newSignUp && (
        <Result
          status="success"
          title="Başarıyla kayıt oldunuz."
          subTitle="Lütfen giriş yapılsınız"
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
