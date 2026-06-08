import { ServicePage } from '../components/services/ServicePage'
import { serviceVerticals } from '../data/serviceCatalog'

export function Taxes() {
  return <ServicePage vertical={serviceVerticals.taxes} />
}

export default Taxes
