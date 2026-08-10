'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase.js'

interface CreateWidgetInput {
    customer_name : string ,
    content : string
}


export async function createWidget( formData : FormData){
  
   const { data: {user} , error: authError } = await supabase.auth.getUser();

   if( authError || !user){
       throw new Error("You must be logged in")
}

  const name = formData.get('widgetName') as string ;

     if(!name || !name.trim()){
        throw new Error("Widget name cannot be empty")
     }

     const { data , error} = await supabase
       .from('widgets')
       .insert([
        {
         name : name.trim() ,
         user_id : user.id ,
       }
    ])
    .select()
    .single();

    if(error) {
         console.error('Database Error :', error.message);
         throw new Error('Failed to create widget')
    }
    revalidatePath('./dashboard');

    return data ;
}