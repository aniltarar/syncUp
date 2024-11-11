export const roleLoader = (requiredRoles) => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async(user) => {
            if(!user){
                resolve(redirect("/auth/login"))
            }else{
                const userRef = doc(db,"users",user.uid)
                const userDoc = await getDoc(userRef)

                if(userDoc.exists()){
                    const role = userDoc.data().role
                    if(requiredRoles.includes(role)){
                        resolve(null)
                    }else{
                        resolve(redirect("/auth/login"))
                    }
                }else{
                    resolve(redirect("/auth/login"))
                }
            }
        })
    })
}

/*

export const register => (email,password)






*/