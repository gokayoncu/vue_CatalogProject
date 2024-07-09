import supabase from "@/plugin/supabase";

export interface IUser{    
    id:string | undefined,
    displayName: string
}
export interface IProduct{    
    title: string,
    descriptions: string,
    price: number|string,
    currency: string,
    categorie_id: number|string,
    images: string,
}

class authService{
    async login(userName:string,password:string): Promise<boolean>{
        const { error }= await supabase.auth.signInWithPassword({
            email: userName,
            password: password
        })
        if(error){
            return false
        }else{
            return true
        }
        
    }
    async logout(): Promise<boolean>{
        const {error} = await supabase.auth.signOut();
        localStorage.removeItem('supabase.auth.token');
        if (error) {
            console.log('Çıkış yaparken bir hata oluştu:', error.message);
            return false;
        } else {
            console.log('Çıkış başarılı.');
            localStorage.removeItem('supabase.auth.token');
            return true;
        }
    }

    async getUser(): Promise<IUser | null >{
        const {data} = await supabase.auth.getUser()
        const user= data.user
        return{
            id: user?.id,
            displayName: user?.email!
        }
    }
    async isAuth(): Promise<boolean>{
        const { data } = await supabase.auth.getSession()
        if(data.session){
            return true
        }
        else{
            return false
        }
    }
}

export default new authService()