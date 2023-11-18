

import UserDetails from "../../components/MuiComponent/PhotoGrapherProfile/UserDetails"
 const ProfilePage  =({data})=>{
   return <UserDetails    data={data}  />
}

export default ProfilePage

export async function getServerSideProps() {

    return {
        props: {
          data:{},
        },
      }
}