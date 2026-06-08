import { ServicePage } from '../components/services/ServicePage'
import { serviceVerticals } from '../data/serviceCatalog'

export function Seguros() {
  return <ServicePage vertical={serviceVerticals.seguros} />
}

export default Seguros
