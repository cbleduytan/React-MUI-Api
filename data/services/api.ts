//create a form user
import axios from "axios";
//Thêm mới người dùng.
export async function createForm(body: API.UserForm, options?: { [key: string]: any }) {
    try {
        const response = await axios.post<API.CreatedResult>("http://localhost:8000/service/api/create", body, {
            headers: {
                "Content-Type": "application/json",
            },
            ...(options || {}),
        });
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getUsers() {// lấy thông tin user hiển thị lên bảng Team.tsx
    try {
        const response = await axios.get<API.UserForm[]>("http://localhost:8000/service/api/users");
        return response.data
    } catch (error: any) {
        throw new Error(error.message);
    }
}
//Edit and Update user by ID
export async function editUser(userId: number, body: API.UserForm, options?: { [key: string]: any }) {
    try {
        const response = await axios.put<API.UserForm>(`http://localhost:8000/service/api/users/${userId}`, body, {
            headers: {
                "Content-Type": "application/json",
            },
            ...(options || {}),
        });
        console.log('response.data', response.data);
        return response.data;


    } catch (error: any) {
        throw new Error(error.message)
    }
}
//Get user by ID
export async function getUserById(id: number) {
    // Kiểm tra xem userId có giá trị hợp lệ không
    if (!id) {
        throw new Error("Invalid userId");
    }

    try {
        const response = await axios.get<API.UserForm>(`http://localhost:8000/service/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("getUserById Error: ", error);
        throw new Error(error.message)
    }
}
