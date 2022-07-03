import { useEffect, useState } from "react";
//1.useEffect(callback)
//-Gọi callback mỗi khi component re-render
//- Gọi callback sau khi component thêm element vào Dom
//2.useEffect(callback, [])
//-Chỉ gọi callback 1 lần sau khi component mounted
//3.useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi desp thay đổi

//----------Khái niệm chung
//1. callback luôn được gọi sau khi component mounted
//2. Cleanup function luôn được gợi trước khi component unmounted
//3. Cleanup function luôn được gợi trước khi callback duoc goi ( tru lan mounted )

function Content() {
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        //Cleanup function
        return () => {
            //nếu có avatar rồi thì xóa URL của ảnh cũ
          avatar &&  URL.revokeObjectURL(avatar.preveiw)
        }
    },[avatar])

    //event chọn files
  const handlePreveiwAvatar = (e) => {
    const file = e.target.files[0]
    file.preveiw = URL.createObjectURL(file)

    setAvatar(file)
  }

  return (
    <div>
        <input type="file"
        onChange={handlePreveiwAvatar} />

        {avatar && (
            <img src={avatar.preveiw} alt="" width ="80%" />
        )}
    </div>
  );
}

export default Content;
