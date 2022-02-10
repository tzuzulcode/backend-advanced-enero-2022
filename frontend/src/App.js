import './App.css';
import {useQuery,gql, useMutation} from '@apollo/client'
import axios from 'axios'
import { useEffect } from 'react';

const query = gql`
  query Users {
    users {
      name
      email
      role
      id
    }
  }
`

const queryGraphQL = `
query Users {
  users {
    name
    email
    role
    id
  }
}
`

const mutation = gql`
  mutation UpdateUser($id:String!,$user:UserInput){
    updateUser(id:$id,user:$user){
      id
      name
      role
    }
  }
`



function App() {
  const {loading,data,error} = useQuery(query,{
    
  })
  const [mutate,{loading:mutationLoading,data:mutationData,error:mutationError}] = useMutation(mutation)

  const changeRole = () =>{
    mutate({variables:{id:"61f3ed74a5b1710b84709b0c",user:{role:"ADMIN"}}})
  }

  useEffect(()=>{
    axios.post("http://localhost:8000/graphql",{
      query:queryGraphQL
    }).then(res=>{
      console.log(res.data)
    })

    
  })


  const login = ()=>{
    axios.post("http://localhost:8000/api/auth/login",{
      "email":"mail@tzuzulcode.com",
      "password":"12345abc"
    },{
      withCredentials:true
    }).then(res=>console.log(res))
  }
  const logout = ()=>{
    axios.post("http://localhost:8000/api/auth/logout",{},{
      withCredentials:true
    }).then(res=>console.log(res))
  }

  return (
    <div>
      <p>Queries</p>

      {console.log(data)}

      {loading?<p>Loading</p>:
        error?<p>Error....</p>:
        <div>
          {data.users?.map(user=><p key={user.id}>{user.name} {user.role}</p>)}
        </div>
      }

      <button onClick={login}>Iniciar sesión</button>
      <button onClick={logout}>Cerrar sesión</button>

      <a href='http://localhost:8000/api/auth/google'>Iniciar con Google</a>

      <button onClick={changeRole}>Cambiar rol</button>
      {mutationError&&<p>{console.log(mutationError)}</p>}

    </div>
  );
}

export default App;
