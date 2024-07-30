<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Label } from "$lib/components/ui/label";
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";

  interface User {
    name:string,
    email:string
  }

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
    if(users.length === 0)
      users = await fetchUser();
  });


  //handle delete icon click
  const handleDelete = async (e:any) => {
    const buttonName:string = e.currentTarget.name || '';
    users = users.filter((user) => {
      return user.name !== buttonName
    })

    const res = await fetch("/deleteuser",{
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: buttonName
      })
    })   
    
    if(!res.ok)
      console.log("successfully deleted");
    else
      console.log("unable to delete the user from DB.")
  }
</script>

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
            <div class="flex flex-row mt-2">
              <Label for="name">{user.name}</Label>
              <Label class="ml-3" for="email">{user.email}</Label>
              <button type="submit" class="ml-auto" name={user.name} on:click={(e) => handleDelete(e)}>
                <i class="mi mi-delete"></i>
              </button>
            </div>
          {/each}
        {/if}
      </div>
    </form>
  </Card.Content>
</Card.Root>
