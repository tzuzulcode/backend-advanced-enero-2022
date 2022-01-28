import './App.css';
import {useQuery,gql, useMutation} from '@apollo/client'

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
  const {loading,data,error} = useQuery(query)
  const [mutate,{loading:mutationLoading,data:mutationData,error:mutationError}] = useMutation(mutation)

  const changeRole = () =>{
    mutate({variables:{id:"61f3ed74a5b1710b84709b0c",user:{role:"ADMIN"}}})
  }
  return (
    <div>
      <p>Queries</p>

      {loading?<p>Loading</p>:
        error?<p>Error....</p>:
        <div>
          {data.users?.map(user=><p key={user.id}>{user.name} {user.role}</p>)}
        </div>
      }

      <button onClick={changeRole}>Cambiar rol</button>
      {mutationError&&<p>{console.log(mutationError)}</p>}
    </div>
  );
}

export default App;
