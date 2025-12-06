---
sidebar_position: 16
title: Chapter 16 - Easy Guide to Robot Hardware
description: Understanding essential robot hardware components, computers, sensors, and actuators
---

# Chapter 16: Easy Guide to Robot Hardware

Welcome to Chapter 16! Now it's time for **hardware** - the physical components that make robots work. This chapter covers computers, motors, sensors, and power systems.

## 🎯 Learning Objectives

- Understand essential robot hardware
- Select appropriate computers and microcontrollers
- Choose motors and actuators
- Select sensors for applications
- Design power systems

## 📚 Chapter Overview

1. **Computers and Microcontrollers**
2. **Motors and Actuators**
3. **Sensors Selection**
4. **Power Systems**
5. **Integration and Assembly**

## 💻 Computers and Microcontrollers

### Main Computer (Brain)

| Computer | Specs | Best For | Cost |
|----------|-------|----------|------|
| **Raspberry Pi** | 4GB RAM, ARM CPU | Small robots, learning | $50-80 |
| **NVIDIA Jetson** | GPU, AI acceleration | Vision, ML | $200-500 |
| **Intel NUC** | x86, powerful | Complex robots | $300-800 |
| **Desktop PC** | Most powerful | Stationary/research | $500+ |

### Microcontrollers (Real-Time Control)

- **Arduino**: Simple, beginner-friendly
- **ESP32**: WiFi, Bluetooth built-in
- **Teensy**: Fast, many pins

### Architecture Pattern

```
Main Computer (ROS 2, AI, Planning)
        ↓ (commands)
Microcontroller (Motor control, sensors)
        ↓ (signals)
Motors, Sensors, Actuators
```

## ⚙️ Motors and Actuators

### DC Motors

```
Cheap, simple, continuous rotation
✅ Wheels, fans
❌ Hard to control position
```

### Servo Motors

```
Position control built-in
✅ Robot arms, legs
❌ Limited rotation (usually 180°)
```

### Stepper Motors

```
Precise steps, no feedback needed
✅ 3D printers, exact positioning
❌ Can be slow
```

### dynamixel Servos

```
Professional, smart, chained together
✅ Humanoid robots, research
❌ Expensive ($100-500 each)
```

## 📡 Sensor Selection

### Must-Have Sensors

1. **IMU**: Know orientation
2. **Encoders**: Track wheel position
3. **Camera**: See environment
4. **Distance sensor**: Avoid collisions

### Nice-to-Have

- LiDAR: Detailed mapping
- Force/torque: Safe interaction  
- GPS: Outdoor navigation

## 🔋 Power Systems

### Battery Types

| Type | Voltage | Capacity | Best For |
|------|---------|----------|----------|
| **LiPo** | 11.1V (3S) | High | Drones, mobile robots |
| **Li-Ion** | 3.7V | Medium | Consumer electronics |
| **Lead-Acid** | 12V | Very high | Large robots, cheap |

### Power Budget

```
Component Power Plan:
- Computer: 15W
- Motors (4x): 40W total
- Sensors: 5W
Total: ~60W

Battery needed:
60W / 12V = 5A
Run time 2 hours → 10Ah battery
```

## 📝 Chapter Summary

✅ **Computers** run ROS 2 and AI
✅ **Microcontrollers** handle real-time control
✅ **Motors** create movement
✅ **Sensors** perceive environment
✅ **Power systems** keep robots running

## 🚀 Next Steps

Next, we'll learn **sim-to-real transfer**!

👉 **[Continue to Chapter 17: Training in Simulation and Using Robots in Real Life](../17-sim-to-real/index.md)**

---

**Chapter 16 Complete!** ✅
