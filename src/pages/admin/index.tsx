import React, {useEffect} from 'react'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import Container from '@/components/common/container/Container'
import CategoriesAdmin from '@/components/admin/CategoriesAdmin'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import { useCategoriesContext } from '@/context/categoryContext'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/router'

const Admin = () => {

  const router = useRouter()
  const [ isAdmin, setIsAdmin ] = React.useState(false)
  const { categories } = useCategoriesContext()
  const { isAdminLoggedIn } = useUserContext()

  useEffect(() => {
    isAdminLoggedIn(()=>{ setIsAdmin(true) }, () => {router.push('/login')})
  }, [])

  if(!isAdmin) return null
 
  return (
    <LayoutAdmin>
      <Container className='py-5' >
        <CategoriesAdmin categories={categories} />
        {/* Add Product button */}
        <div className='flex justify-start my-8 pt-5'>
          <Link href='/admin/add-product'>
            <Button  >
              Add New Product
            </Button>
          </Link>
        </div>
      </Container>
    </LayoutAdmin>
  )
}

export default Admin