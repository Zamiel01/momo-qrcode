import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveMerchantData(merchantData: {
  merchant_name: string
  merchant_code: string
  city: string
  qr_payload: string
}) {
  try {
    const { data, error } = await supabase
      .from('merchant_qr_codes')
      .insert([merchantData])
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error saving merchant data:', error)
    return { success: false, error }
  }
}
