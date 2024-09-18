import { OrderCard } from '@/components/order/OrderCard'
import { prisma } from '@/src/lib/prisma'
import React from 'react'


async function getPendingOrder(){
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      OrderProducts:{
        include: {
          product: true
        }
      }
    }
  })  
  return orders
}

export default async function OrdersPage() {
  const orders = await getPendingOrder()
  const isEmtpy = orders.length === 0
  
  return (
    <>
      <h2 className='subtitle py-8'>Administrar pedidos</h2>

      {
        !isEmtpy ? (
          <section className='max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
          {
            orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          }
  
        </section>
        ) : (
          <p className='text-center text-slate-800 text-2xl font-bold'>No hay pedidos pendientes</p>
        )
      }

    
    </>
  )
}
