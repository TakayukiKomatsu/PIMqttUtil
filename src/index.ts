import * as mqtt from 'mqtt'
import * as dotenv from 'dotenv'

dotenv.config()

const options: mqtt.IClientOptions = {
  host: process.env.MQTT_HOST,
  port: 8883,
  protocol: 'mqtts',
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
}

const client = mqtt.connect(options)
client.on('connect', function () {
  client.subscribe('sensors/temperature', function (err) {
    if (!err) {
      for (let i = 0; i <= 20; i++) {
        client.publish('sensors/temperature', i.toString())
      }
    }
  })
})

client.on('message', function (topic, message) {
  console.log('🚀 ~ file: index.ts ~ line 14 ~ topic', topic)
  console.log(message.toString())
  client.end()
})
