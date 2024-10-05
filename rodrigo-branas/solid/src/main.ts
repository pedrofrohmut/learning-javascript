import Router from "./infra/api/router"

const main = async () => {
    const router = new Router()
    await router.start()
}

main()
