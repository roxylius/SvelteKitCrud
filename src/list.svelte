<script type="ts">
    import * as Card from "$lib/components/ui/card/index";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
  </script>
  
  <Card.Root class="w-[350px] m-5">
    <Card.Header>
      <Card.Title>List of Users</Card.Title>
      <Card.Description>Display all saved users in DB</Card.Description>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-row mt-2">
            <Label for="name">Name</Label>
            <Label class="ml-3" for="name">Name</Label>
          </div>
          <div class="flex flex-row mt-2">
            <Label for="email">email</Label>
            <Label class="ml-3" for="name">Name</Label>
          </div>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
  