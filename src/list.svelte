<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";


  interface User {
    id:Number;
    name: string;
    email: string;
    isEdit: boolean;
  }

  let editingUser: User | null = null;

  // Fetch API
  const fetchUser = async (): Promise<User[]> => {
    const response = await fetch("/getuser");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const json = await response.json();
    console.log(json.rows);
    return json.rows;
  };

  let users: User[] = [];

  onMount(async () => {
    if (users.length === 0) {
      users = await fetchUser();
      users = users.map((user) => {
        return { ...user,isEdit: false };
      });
      console.log("us", users);
    }
  });

  //handle delete icon click
  const handleDelete = async (e: any) => {
    const buttonName: string = e.currentTarget.name || "";
    users = users.filter((user) => {
      return user.name !== buttonName;
    });

    const res = await fetch("/deleteuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: buttonName,
      }),
    });

    if (!res.ok) console.log("successfully edited the user in db");
    else console.log("unable to edit the user in DB.");
  };

  const editDetails = async (e: any) => {
    users = users.map((user) => {
      if (user.name == e.currentTarget.name) {
        console.log("in filter");
        
        //add the details of the user to be edited in editingUser
        editingUser = user;

        return { ...user, isEdit: !user.isEdit };
      }
      return {...user,isEdit: false};
    });
  };

  const handleEditSave = async (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }): any =>  {
    
    //find the user with the edited user id and saves the newly edited data
    users = users.map(user => {
      if(user.id == editingUser?.id){        
        return editingUser;
      }
      return user;
    });
    console.log("inEditing:",users);
      
    //set all(to handle edge cases) users isEdit to false
    users = users.map(user => {return {...user,isEdit: false}});

     //edit the user in the db
     const response = await fetch("/edituser",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({...editingUser})
    })

    //if the reponse is correct
    if (response.ok) console.log("successfully deleted");
    else console.log("unable to delete the user from DB.");

  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<Card.Root class="w-[350px] m-5">
  <Card.Header>
    <Card.Title>List of Users</Card.Title>
    <Card.Description>Display all saved users in DB</Card.Description>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="grid w-full items-center gap-4">
        {#if users.length === 0}
          <p>Loading.....</p>
        {:else}
          {#each users as user}
            {#if user.isEdit == true}
              <div class="flex flex-row mt-2">
                <Input bind:value={editingUser.name}/>
                <Input class="ml-3" bind:value={editingUser.email }/>
                <!-- <Label for="name">{user.name}</Label>
                <Label class="ml-3" for="email">{user.email}</Label> -->
                <div class="flex flex-row ml-auto">
                  <button
                    type="submit"
                    class="ml-3"
                    name={user.name}
                    on:click={(e) => editDetails(e)}
                  >
                    <i class="mi mi-edit"></i>
                  </button>
                  <button
                    type="submit"
                    class="ml-3"
                    name={user.name}
                    on:click={(e) => handleEditSave(e)}
                  >
                  <i class="mi mi-check"></i>
                  </button>
                </div>
              </div>
            {:else}
              <div class="flex flex-row mt-2">
                <Label for="name">{user.name}</Label>
                <Label class="ml-3" for="email">{user.email}</Label>
                <div class="flex flex-row ml-auto">
                  <button
                    type="submit"
                    class="ml-3"
                    name={user.name}
                    on:click={(e) => editDetails(e)}
                  >
                    <i class="mi mi-edit"></i>
                  </button>
                  <button
                    type="submit"
                    class="ml-3"
                    name={user.name}
                    on:click={(e) => handleDelete(e)}
                  >
                    <i class="mi mi-delete"></i>
                  </button>
                </div>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    </form>
  </Card.Content>
</Card.Root>
