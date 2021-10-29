import { Table, Tag, Modal,Button,Form,Input,Select,Space, Spin } from 'antd';
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../store/actions/categoryActions';
import { Category, CategoryFormModel } from '../types/category';
import {SketchPicker} from "react-color";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Mode from '../types/modal';

function Categories() {

  //Default form model
  const emptyForm:CategoryFormModel={
    name:"",
    type:"expense",
    color:"black"
  }

    // Store dan Category State erişimini sağladım
    const {data,loading,error}=useSelector((state:AppState)=>state.categories)

    //güncelleme işlemi sırasında bizlere id lazım olacağı için bu değeri componentin state inde tutacağız
    const[updateId,setUpdateId]=useState<number|null>(null);

    //delete işlemi sırasında bizlere id lazım olacağı için bu değeri componentin state inde tutacağız
    const[deleteId,setDeleteId]=useState<number|null>(null);

    //State Hooks 
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Bu State imiz iki opsiyonlu değer alan bir değişkendir,açılan modal add işlemi mi yapacak update mi
    const [mode, setMode] = useState<Mode>("add");

    //Form dataları için state oluşturduk ama şayet güncelleme yapacak ise state içeriğini tıkladığı form ile doldurmamız gerekmektedir
    const [form,setForm]=useState<CategoryFormModel>(emptyForm);


    //Modal Functions
    const showModal = (mode:Mode) => {
      setIsModalVisible(true);
      setMode(mode);
    };

    const handleOk = () => {
      //Ekleme işlemi mi yapılacak yoksa güncelleme mi yoksa silme mi
      if (mode==="add") {
        //OnChange ile form oluşturmuştum.Onu Redux tarafında çalışan api ye gönderiyorum
        dispatch(addCategory(form));
      } else if(mode==="update") {
        //inputlar daki onChange aracılığıyla form nesnemi doldurdum.id ile birlikte api ye gönderiyorum
        dispatch(updateCategory(form,updateId as number))
      } else if(mode==="delete" && typeof deleteId==="number"){
        //Silme işlemi
        dispatch(deleteCategory(deleteId))
      }

      setIsModalVisible(false);
       //default değere set ediyorum
       setMode("add");
       //Form inputlarını resetlemek için
       setForm(emptyForm);
       //id değerini tekrardan null a set ediyoruz
       setUpdateId(null);
       //id değerini tekrardan null a set ediyoruz
       setDeleteId(null);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      //default değere set ediyorum
      setMode("add");
       //Form inputlarını resetlemek için
       setForm(emptyForm);
       //id değerini tekrardan null a set ediyoruz
       setUpdateId(null);
       //id değerini tekrardan null a set ediyoruz
       setDeleteId(null);
    };

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          render:(text:string,category:Category)=>{
              return <Tag color={category.color}>{text.toUpperCase()}</Tag>
          }
        },
         {
           title: 'Action',
           key: 'action',
           render: (text:string, category:Category) => (
             <Space size="middle">
               <EditOutlined onClick={()=>{
                 //edit butonuna basıldığında mevcut id değerimizi componentin state ine set ediyoruz
                 setUpdateId(category.id);
                 showModal("update");
                 setForm(category); //Form da gözükecek default value lar için state i güncelliyoruz
               }} style={{color:"blue"}} />
               <DeleteOutlined onClick={()=>{
                 //modal ı delete parametresiyle açıyoruz
                 showModal("delete");
                 //component state değerine silinecek id yi atıyoruz
                 setDeleteId(category.id);
               }} style={{color:"red"}}/>
             </Space>
           ),
         },
      ];

    //Action erişimi için kullanacağız
    const dispatch=useDispatch();

    //component yüklendiği zaman api çağrımı yapacak 
     useEffect(()=>{
        dispatch(getCategories());
     },[]);

     type SizeType = Parameters<typeof Form>[0]['size'];

     const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
     const onFormLayoutChange = ({ size }: { size: SizeType }) => {
       setComponentSize(size);
     };

    return (
      //React.Fragment üst katmanı div yaptığımızda başka bir yerde componentimizi render ettiğimizde
      //karşılaştığımız sorunları yok sayan soyut bir kapsayıcıdır
      <React.Fragment>
      <>
      <Button type="primary" onClick={()=>showModal("add")}>
        New Category
      </Button>
      <Modal title={mode==="add"?"Add New Category":mode==="update"? "Update Category":"Delete Category"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      { mode==="update" || mode==="add" ?
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
          <Form.Item label="Category Name">
          <Input name="name" value={form.name} onChange={event=>setForm({...form,name:event.target.value})} />
        </Form.Item>
        <Form.Item label="Category Type">
          <Select value={form.type}  defaultValue="expense" onChange={type=>setForm({...form,type})}>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="color">
          <SketchPicker color={form.color} onChange={color=>setForm({...form,color:color.hex})} />
        </Form.Item>
        </Form>
        : mode==="delete" ? <>Are You Sure</>:null
      }
      
      </Modal>
    </>
        {/* redux state tarafında loading true ise spinner gözükecek  */}
        <Table loading={loading} columns={columns} dataSource={data} rowKey="id"/>
      </React.Fragment>
    )
}

export default Categories
