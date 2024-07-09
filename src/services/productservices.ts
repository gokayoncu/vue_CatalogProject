import supabase from "@/plugin/supabase"

export default{
    async getProducts(id:any){
        return await supabase.from('products').select().eq('categorie_id', id)
    },
    async getAllProduct(){
        return await supabase.from('products').select()
    },
    async addProduct( products:any){
        return supabase
        .from('products')
        .insert({
            title: products.title,
            descriptions: products.descriptions,
            price: products.price,
            currency: products.currency,
            categorie_id: products.categorie_id,
            images: products.images
        }).select()
    },
    async removeProduct( productId:number){
        return supabase
        .from('products')
        .delete()
        .eq('id', productId)
    }
}