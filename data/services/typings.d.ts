declare namespace API {
    type UserForm = {
        userName?: string;
        age?: number;
        email?: string;
        phoneNumber?: string;
        userId?: number;
    }

    type CreatedResult = {
        status?: string;
        type?: string;
        message?: string;
    }
}