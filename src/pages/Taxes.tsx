import { ServicePage } from '../components/services/ServicePage'
import { useLocalizedServiceVerticals } from '../context/LanguageContext'

export function Taxes() {
  const serviceVerticals = useLocalizedServiceVerticals()
  return <ServicePage vertical={serviceVerticals.taxes} />
}

export default Taxes
