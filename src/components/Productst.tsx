import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {Button, Form, Input, Modal, Select, Space, Table, Tag} from 'antd';
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store';
import { getCategories } from '../store/actions/categoryActions';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../store/actions/productAction';
import { Category, CategoryState } from '../types/category';
import Mode from '../types/modal';
import { Product, ProductFormModel } from '../types/product';

//Default form data
const emptyForm:ProductFormModel={
    amount:0,
    title:"",
    category_id:0
}

function Productst() {
    //Redux tarafında ki state içerisinde ki verileri okuyoruz
    const {data,loading,error}=useSelector((state:AppState)=>state.products);
   
    //Redux tarafında ki state içerisinde ki verileri okuyoruz bize kategori verileri de lazım
    const categoryState:CategoryState=useSelector((state:AppState)=>state.categories);
  
    //action fonksiyonlarına erişim için ekliyoruz
    const dispatch=useDispatch();
  
    //Bu State imiz iki opsiyonlu değer alan bir değişkendir,açılan modal add işlemi mi yapacak update mi
    const [mode, setMode] = useState<Mode>("add");
  
    //Form dataları için state oluşturduk ama şayet güncelleme yapacak ise state içeriğini tıkladığı form ile doldurmamız gerekmektedir
    const [form,setForm]=useState<ProductFormModel>(emptyForm);
   
    //güncelleme işlemi sırasında bizlere id lazım olacağı için bu değeri componentin state inde tutacağız
     const[updateId,setUpdateId]=useState<number|null>(null);
  
     //delete işlemi sırasında bizlere id lazım olacağı için bu değeri componentin state inde tutacağız
     const[deleteId,setDeleteId]=useState<number|null>(null);
   
     //State Hooks 
    const [isModalVisible, setIsModalVisible] = useState(false);

     //verdiğimiz tipe göre modal açılacak
     const showModal = (mode:Mode) => {
        setIsModalVisible(true);
        setMode(mode);
      };



      const handleOk = () => {
        //Ekleme işlemi mi yapılacak yoksa güncelleme mi yoksa silme mi
        if (mode==="add") {
          //OnChange ile form oluşturmuştum.Onu Redux tarafında çalışan api ye gönderiyorum
          dispatch(addProduct(form));
        } else if(mode==="update") {
          //inputlar daki onChange aracılığıyla form nesnemi doldurdum.id ile birlikte api ye gönderiyorum
          dispatch(updateProduct(form,updateId as number))
        } else if(mode==="delete" && typeof deleteId==="number"){
          //Silme işlemi
          dispatch(deleteProduct(deleteId))
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

     //Kolon ve dataların gösterim şekillerinin düzenlendiği array
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          render:(amount:Product["amount"],product:Product)=>{
              let TurkishLiraCurrency=Intl.NumberFormat("tr-TR",{
                  style:"currency",
                  currency:"TRY"
              });
              return <>{TurkishLiraCurrency.format(amount)}</>
          }
        },
        {
            title: 'Last Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render:(updatedAt:string,product:Product)=>{
                return <>{`${new Date(updatedAt).toLocaleDateString()} ${new Date(updatedAt).toLocaleTimeString()}` }</>
            }
          },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render:(category:Category,product:Product)=>{
                return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>
            }
          },
         {
           title: 'Action',
           key: 'action',
           render: (text:string, product:Product) => {
            //Ürünün form tipinde category_id olmasına rağmen ürün tipinde böyle bir değer olmadığı için tür dönüşümünü yapmamız gerekti
             const {title,amount}=  product;
             const category_id=product.category.id;
            return (
                <Space size="middle">
                  <EditOutlined onClick={()=>{
                     //edit butonuna basıldığında mevcut id değerimizi componentin state ine set ediyoruz
                     setUpdateId(product.id);
                     showModal("update");
                     setForm({title,amount,category_id}); //Form da gözükecek default value lar için state i güncelliyoruz
                  }} style={{color:"blue"}} />
                  <DeleteOutlined onClick={()=>{
                    //modal ı delete parametresiyle açıyoruz
                    showModal("delete");
                    //component state değerine silinecek id yi atıyoruz
                    setDeleteId(product.id);
                  }} style={{color:"red"}}/>
                </Space>
              )
           }
         },
      ];

      type SizeType = Parameters<typeof Form>[0]['size'];

      const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
      const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
      };

     
      //Component ilk yüklendiğinde çalışacak
      useEffect(()=>{
        dispatch(getProduct());
        //Kategori State i boş ise
        if(!(categoryState.data.length>0)){
            dispatch(getCategories());
        }
      },[]);

      //Form öğeleri validasyondan geçti mi?
      const isFormValid= !(!form.title || form.amount===0 || form.category_id===0);


    return (
    <React.Fragment>
        <Button type="primary" onClick={()=>{showModal("add")}}>
            New Product
       </Button>
       <Modal 
       title={mode==="add"?"Add New Product":mode==="update"? "Update Product":"Delete Product"} 
       visible={isModalVisible} 
       onOk={handleOk} 
       onCancel={handleCancel}
       okButtonProps={{disabled: !(mode==="delete") && !isFormValid}}
       >
      { mode==="update" || mode==="add" ?
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
          <Form.Item label="Product Name">
          <Input name="title" value={form.title} onChange={event=>setForm({...form,title:event.target.value})} />
        </Form.Item>
        <Form.Item label="Price">
          <Input name="amount" type="number" value={form.amount} onChange={event=>setForm({...form,amount:Number.parseInt(event.target.value)})} />
        </Form.Item>
        <Form.Item label="Category">
          <Select value={form.category_id}  defaultValue={form.category_id} onChange={(category_id)=>setForm({...form,category_id})}>
            <Select.Option value={0} disabled >Select Category</Select.Option>
            {
                //Kategorileri redux state den alıp burada select box a ekliyorum
                categoryState.data.map(category=>{
                    return (<Select.Option key={category.id} value={category.id} >{category.name}</Select.Option>)
                })
            }
          </Select>
        </Form.Item>
        </Form>
        : mode==="delete" ? <>Are You Sure</>:null
      }
      </Modal>
       <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />
    </React.Fragment>
    )
}

export default Productst
