<script>
  import "../app.css";
  import Header from "../header.svelte";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher/>
<Header/>
<slot></slot>
