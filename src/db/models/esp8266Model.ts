import { 
  Model, 
  Schema,
  model
} from 'mongoose'

interface IDevice {
  ip: string
  mac: string
  clientId: string
}

interface IDeviceDescription {
  name: string
  description: string
  purpose: string
}

interface ILocation {
  stage: number | null
  room: string | null
  position: [number, number] | null
}

interface IDevicePresentation <T extends IDevice> {
  device: T,
  description: IDeviceDescription
  location: ILocation
}

type DeviceModel = Model <IDevice>
type DeviceDescriptionModel = Model <IDeviceDescription>
type LocationModel = Model <ILocation>
type DevicePresentationModel <T extends IDevice> = Model <IDevicePresentation <T>>

const deviceSchema = new Schema <IDevice, DeviceModel> ({
  ip: {
    type: String,
    match: /^(?:25[0-5]|2[0-4]\d|[0-1]?\d{1,2})(?:\.(?:25[0-5]|2[0-4]\d|[0-1]?\d{1,2})){3}$/,
    required: true,
    unique: true
  },
  mac: {
    type: String,
    match: /((?:[a-zA-Z0-9]{2}[:-]){5}[a-zA-Z0-9]{2})/,
    required: true,
    unique: true
  },
  clieentId: {
    type: String,
    reuired: true,
    unique: true
  }
})

const deviceDescriptionSchema = new Schema <IDeviceDescription, DeviceDescriptionModel> ({
  name: {
    type: String,
    required: true
  },
  description: String,
  purpose: String
})

const deviceLocationSchema = new Schema <ILocation, LocationModel> ({
  stage: {
    type: Number,
    default: 0
  },
  room: String,
  position: [Number, Number]
})

const devicePresentationSchema = new Schema <IDevicePresentation <IDevice>, DevicePresentationModel <IDevice>> ({
  device: deviceSchema,
  description: deviceDescriptionSchema,
  location: deviceLocationSchema
})

const devicePresentationModel = model <IDevicePresentation <IDevice>> ('DevicePresentationModel', devicePresentationSchema)

export {
  devicePresentationModel,
  IDevice,
  IDeviceDescription,
  IDevicePresentation,
  ILocation,
}



