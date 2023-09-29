function priceHelper(price){
  return price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}


module.exports = priceHelper;