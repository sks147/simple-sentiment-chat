const socket = io()

socket.on('countUpdated', count => {
  console.log('Count updated', count)
})
