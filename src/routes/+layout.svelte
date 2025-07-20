<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "$lib/stores";
  import "../static/reset.css"
  import "../static/global.css";

  onMount(async () => {
    try {
      const response = await fetch("/auth/session")

      if(response.ok) {
        const session = await response.json()
        user.set(session?.user || null)
      }
    } catch(error) {
        console.error("セッション取得エラー：" + error)
        user.set(null)
    }
  })
</script>

<div class="layout">
  <slot />
</div>