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

const sensorId = 2
const selectedRoom = 'sala'
const temperatures = [24, 24, 23]

const mqttTopic = `sensors/${selectedRoom}/temperature/${sensorId}`
const client = mqtt.connect(options)
client.on('connect', function () {
  client.subscribe(mqttTopic, function (err) {
    if (!err) {
      for (let i = 0; i <= temperatures.length - 1; i++) {
        client.publish(mqttTopic, temperatures[i].toString())
      }
    }
  })
})

client.on('message', function (topic, message) {
  console.log('🚀 ~ file: index.ts ~ line 31 ~ topic', topic)
  console.log('🚀 ~ file: index.ts ~ line 32 ~ message', message.toString())
  client.end()
})
