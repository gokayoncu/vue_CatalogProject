import supabase from '@/plugin/supabase';

export default{
    async getCard(userId:any){
        if (!userId) return;

        const { data, error } = await supabase.from('cards')
            .select('id, amount, products(title, price, currency, images)')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching cards:', error.message);
            return;
        }

        return data;
    },
    
    async removeCardItem (userId: string | null, cardItemId:number){
        await supabase.from('cards').delete().eq('user_id',userId).eq('id',cardItemId)
    },
    async addCardItem(amount:any,product:any,userData:any){
       return  await supabase.from("cards").insert({
            amount: amount,
            product_id: product,
            user_id: userData
        })
    },
    async getUser(){
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
            return null;
        }
        return userData?.user.id;
    },
    calculatedCardSum(cards:any[]){
        if(!cards)return 0
        return cards?.reduce((a:number,item:any)=>{
            return a + (item.products?.price * item.amount)
        },0)
    }
}