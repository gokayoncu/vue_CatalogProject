import supabase from "@/plugin/supabase"

export default{
    async getCategories(){
        return  supabase.from("categories").select()
    },
    async selectCategories(id:any){
        return supabase.from("categories").select().eq("id", id).single()
    },
    async addCategories(title:string){
        return supabase
            .from('categories')
            .insert({
                title:title
            })
            .select()
    },
    async removeCategories(id:number){
        return supabase
        .from('categories')
        .delete()
        .eq('id', id)
    }
}