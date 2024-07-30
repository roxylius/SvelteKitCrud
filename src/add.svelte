<script type="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
</script>

<Card.Root class="w-[350px] m-5">
  <Card.Header>
    <Card.Title>Add User</Card.Title>
    <Card.Description>Add new users in DB</Card.Description>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="Name" />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="email">Email</Label>
          <Input id="email" placeholder="email" />
        </div>
      </div>
      <Button class="mt-5 py-0 px-3">Save User</Button>
    </form>
  </Card.Content>
</Card.Root>
