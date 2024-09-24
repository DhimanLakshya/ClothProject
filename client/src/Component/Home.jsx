import React from 'react'

function Home() {
  const array = [
    { title: 'Lymio', price: 479, dec: 'Casual Shirt for Men|| Shirt for Men|| Men Stylish Shirt (Rib-', img: 'https://m.media-amazon.com/images/I/71V5gEc8YVL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'BULLMER', price: 499, dec: 'Trendy Clothing Set with Oversized T-Shirt & Pants Co-', img: 'https://m.media-amazon.com/images/I/61bULdJcMsL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'Dennis Lingo', price: 1199, dec: 'Parx Mens Pure Cotton Double Cloth Pattern Slim Fit Semi Cutaway', img: 'https://m.media-amazon.com/images/I/71e0g0uFTOL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'GRECIILOOKS', price: 489, dec: 'Regular Fit Track Pant for Men', img: 'https://m.media-amazon.com/images/I/51rgGjt-lnL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'Amazon Brand - Symbol', price: 654, dec: 'Men Casual Cotton Pants | Chinos | Trousers (Regular Fit', img: 'https://m.media-amazon.com/images/I/61krYlviVXL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'Ben Martin', price: 746, dec: 'Mens Denim Cotton Oversized Loose Baggy Fit Jeans Pants fo', img: 'https://m.media-amazon.com/images/I/71OBVZ-69WL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'Imsa Moda', price: 399, dec: 'Mens Waffle Tank Tops Sleeveless Round Neck', img: 'https://m.media-amazon.com/images/I/61gBL7LlBUL._AC_UL480_FMwebp_QL65_.jpg' },
    { title: 'Parx', price: 1299, dec: 'Mens Solid Pattern Super Slim Fit Cotton Blend Flat Front', img: 'https://m.media-amazon.com/images/I/61fCSIqIhAL._AC_UL480_FMwebp_QL65_.jpg' },
  ]

  return (

    <div className=' h-full '>

      <h1 className='font-bold text-3xl flex justify-center'>Results</h1>
      <p className='flex text-2xl justify-center'>Price and other details may vary based on product size and colour.</p>

      <div className='flex flex-wrap justify-evenly items-center pt-5 gap-5'>

        {
          array.map((value) =>
          (
            <div className='flex flex-col border rounded-md mt-5 shadow-md hover:shadow-lg'>
              <div className='flex justify-center mt-10 mx-10'>
                <img className='h-[400px] w-[200px]' src={value.img} alt="" />
              </div>
              <div className='flex flex-col gap-5  bg-[#faf8f8]'>
                <h1 className=' flex justify-center font-bold'>{value.title}</h1>
                <p className='flex justify-center max-w-[300px]'>{value.dec}</p>
                <p className='flex justify-center font-bold '>₹ {value.price}</p>
              </div>
            </div>
          ))
        }


      </div>
    </div>


  )
}

export default Home