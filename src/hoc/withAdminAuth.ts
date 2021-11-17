import {GetServerSideProps, GetServerSidePropsContext} from "next"
import ApiClientSSR from "../lib/ApiClientSSR"

export function withAdminAuth(): GetServerSideProps {
    return async (context: GetServerSidePropsContext) => {
        try {
            const access = await ApiClientSSR(context).get('/admin')
            return {
                props: {}
            }
        } catch (e) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
    }
}
