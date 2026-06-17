import { ServicePage } from '../components/services/ServicePage'
import { serviceVerticals } from '../data/serviceCatalog'

export function Otros() {
  return <ServicePage vertical={serviceVerticals.otros} />
}

export default Otros
