import cron from "node-cron";
import axios from "axios"


const job = ()=>{
    cron.schedule("*/14 * * * *", ()=>{
        axios.get("https://cshub-v-4.onrender.com/modules")
        .then(res =>{ console.log("Server is Working") })
        .catch(()=> console.log("Error Server is Down"))
    })
}

export default job