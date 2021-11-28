<template>
  <div class="container">
    <Instructions title="Title" instructions="Lorum." />
    <div class="card mb-2">
      <div class="card-body">
        <div class="row">
          <div class="col text-start">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
              />
              <label class="btn btn-outline-primary" for="btnradio1">A-Z</label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="btnradio2">Z-A</label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio3"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="btnradio3"
                >Radio 3</label
              >
            </div>
          </div>
          <div class="col-4">
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <PokeCard />
  </div>
</template>

<script>
import Instructions from '@/components/Instructions.vue';
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'Main',
  components: {
    Instructions,
    PokeCard
  }
};
</script>
