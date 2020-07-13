const stableProofs =  artifacts.require('StableProofs')
const CoinbaseOracle =  artifacts.require('CoinbaseOracle')

                        
const contractAddr = "0x52f6925756D63896b8CCC64392cAa3c0Fa9906C2"
const adminAddr = "0xA7E963339C977d14e17666BD91917a76fF9E3342"

// contract('StableProofs Tests', async (accounts) => {
//    it('should show the total supply of HINR', async () => {
//     const instance = await stableProofs.deployed();
//     const supply =  await instance.totalSupply() //1000000
//     console.log(`Total supply = ${supply}`)
//     // assert.equal(Number(toBalance), Number(supply)) 
//    });


//    it('should show the price  of HINR', async () => {
//     const instance = await stableProofs.deployed();
//     console.log(instance.address)
//     const price =  await instance.price() //1000000
//     const bal  =  await instance.balanceOf("0xF5fc2c273098220855f8E093Dda69252b2EeB7Cd")
//     console.log(`price = ${price}`)
//     console.log(`bal = ${bal}`)
//     //assert.equal(Number(toBalance), Number(supply)) 
//    });

// })

module.exports = function() {

    const contractInstance = async () => {
        const instance = await stableProofs.deployed();
        return instance
    }

    contractInstance().then(async( instance) => {
        console.log(instance.address)
        const supply = await instance.totalSupply(); //1000000
        const cBal = await instance.balanceOf(instance.address)
        const aBal = await instance.balanceOf(adminAddr)
        let price =  await instance.price() 
        console.log(`Total supply = ${supply}`)
        console.log(`Contract Balance = ${cBal}`)
        console.log(`Admin Balance = ${aBal}`)
        console.log(`Price : ${price}`)

        const coinbaseInstance = await CoinbaseOracle.deployed()

        // timestamp, _message, _signature, _price
        const res = await coinbaseInstance.setPrice(1594552909, 
            "Setting the price for the first time", 
            "039147abf10001104a87537e6c0ce88508206b729aa99b9e1cfc3b1f4d3efe8cd5dba3caec18c170ef47522efacbcfe8fd585a1fe3b51ec4452d0db595ceab07",
            1);
        console.log(res)
        price =  await instance.price() // TODO; Unable to set may be becuase of the accout bug
        console.log(`Price : ${price}`)
    })
}