---
sidebar_position: 11
title: Chapter 11 - How Humanoid Robots Move
description: Understanding humanoid robot anatomy, kinematics, and motion planning
---

# Chapter 11: How Humanoid Robots Move

Welcome to Chapter 11! Humanoid robots are designed to move like humans with arms, legs, and torso. This chapter explores the mechanics of humanoid movement.

## 🎯 Learning Objectives

- Understand humanoid robot anatomy
- Learn about degrees of freedom (DOF)
- Explore forward and inverse kinematics
- Understand joint control
- Plan humanoid motions

## 📚 Chapter Overview

1. **Humanoid Anatomy**
2. **Degrees of Freedom**
3. **Kinematics - Forward and Inverse**
4. **Joint Control**
5. **Motion Planning**

## 🤖 Humanoid Anatomy

Humanoid robots mimic human body structure.

### Typical Humanoid Components

| Body Part | Joints | Purpose |
|-----------|--------|---------|
| **Head** | 2-3 DOF | Look around, nod |
| **Torso** | 0-3 DOF | Bend, twist |
| **Arms** | 6-7 DOF each | Reach, manipulate |
| **Hands** | 1-20 DOF each | Grasp objects |
| **Legs** | 6 DOF each | Walk, balance |
| **Feet** | 0-2 DOF each | Balance, adapt to terrain |

### Famous Humanoids

- **Atlas** (Boston Dynamics): 28 DOF, athletic
- **ASIMO** (Honda): 57 DOF (with hands)
- **Optimus** (Tesla): 28+ DOF
- **NAO** (Aldebaran): 25 DOF, education

## 🔢 Degrees of Freedom (DOF)

**DOF** = number of independent movements a robot joint can make.

### Human vs Robot DOF

**Human**: ~244 DOF total  
**Humanoid Robot**: Typically 20-60 DOF

### DOF Examples

```
Single Joint:
├─ 1 DOF: Hinge (elbow bend)
├─ 2 DOF: Universal (wrist up/down + left/right)
└─ 3 DOF: Spherical (shoulder - rotate in any direction)

Robot Arm (typical: 6-7 DOF):
1. Shoulder pitch (up/down)
2. Shoulder roll (in/out)
3. Shoulder yaw (rotation)
4. Elbow pitch (bend)
5. Wrist pitch
6. Wrist roll
7. Wrist yaw
```

## 📐 Kinematics

**Kinematics** studies motion without considering forces.

### Forward Kinematics (FK)

**Given**: Joint angles  
**Find**: End effector (hand/foot) position

```
Joint angles → Where is the hand?

Example:
Shoulder: 45°, Elbow: 90°, Wrist: 0°
→ Hand position: (X, Y, Z) = (0.5, 0.3, 0.8)
```

**Easy to calculate!** Just follow the chain.

### Inverse Kinematics (IK)

**Given**: Desired hand position  
**Find**: Joint angles needed

```
Where should the hand be? → What joint angles?

Example:
Wanted position: (0.5, 0.3, 0.8)
→ Shoulder: 45°, Elbow: 90°, Wrist: 0°
```

**Hard problem!** Multiple solutions or no solution.

### IK Challenges

```
Problem 1: Multiple Solutions
  Hand at (0.5, 0, 0.5) can be reached:
  - Elbow up
  - Elbow down
  - Which to choose?

Problem 2: No Solution
  Hand too far away
  - Physically impossible!
  
Problem 3: Singularities
  Certain configurations lose DOF
  - Robot gets "stuck"
```

## 🎮 Joint Control

Controlling individual joints precisely.

### Position Control

```python
# Set joint to target angle
joint.set_position(90)  # degrees

# Wait until reached
while abs(joint.get_position() - 90) > 1:
    time.sleep(0.01)
```

### Velocity Control

```python
# Set joint rotation speed
joint.set_velocity(0.5)  # radians/second
```

### Torque Control

```python
# Apply force to joint
joint.set_torque(10.0)  # Newton-meters
```

## 🚶 Motion Planning

Planning smooth, collision-free movements.

### Trajectory Planning

**Trajectory** = path through space over time (position + velocity + time)

```
Start: Hand at (0, 0, 0)
Goal: Hand at (0.5, 0.3, 0.8)

Trajectory:
t=0s: (0, 0, 0)
t=1s: (0.25, 0.15, 0.4)
t=2s: (0.5, 0.3, 0.8)
```

### Smooth Motion

```python
# Linear interpolation (jerky)
for t in range(0, 100):
    pos = start + (goal - start) * (t/100)
    
# Smooth (using acceleration limits)
trajectory = plan_smooth_motion(start, goal, max_vel, max_accel)
```

## 📝 Chapter Summary

✅ **Humanoids** mimic human anatomy with joints and links  
✅ **DOF** determines movement capabilities  
✅ **Forward kinematics** calculates position from joint angles  
✅ **Inverse kinematics** finds joint angles for desired position  
✅ **Motion planning** creates smooth, safe trajectories  

## 🚀 Next Steps

Next, we tackle **walking and balance** - the hardest part of humanoid robotics!

👉 **[Continue to Chapter 12: Teaching Robots to Walk and Balance](../12-walking-balance/index.md)**

---

**Chapter 11 Complete!** ✅
