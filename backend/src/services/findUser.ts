

const findUser = async(model : any , email : string) => {
     const [result] = await model.findAll({
        where : {
            email : email
        }
    })
    return result
}

export default findUser