<template>
  <div class="container">
    <span class="text">Filtrar tarefas por:</span>
    <ul class="list">
      <li class="item">Mais antigas</li>
      <li class="item">Mais recentes</li>
      <li class="item">Ordem alfabética</li>
      <li class="item">Concluídas</li>
      <li class="item">Pendentes</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background-color: #303030;
  border-radius: 10px;
  position: fixed;
  right: 16px;
  width: 60%;
  border: 1px solid #1976d2;
}

.text {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 10px;
}

.list {
  padding-bottom: 10px;
}

.item {
  cursor: pointer;
  padding: 10px;
}
</style>
