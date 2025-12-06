---
sidebar_position: 8
title: Chapter 8 - How Robots Move and Feel Physics  
description: Understanding physics simulation including gravity, friction, forces, and realistic movement
---

# Chapter 8: How Robots Move and Feel Physics

Welcome to Chapter 8! Robots live in the physical world where **physics rules apply** - gravity pulls things down, friction slows movement, and collisions cause impacts. This chapter explores how simulation engines recreate physics for realistic robot behavior.

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Understand how physics engines work
- Explain gravity, friction, and forces in robotics
- Configure mass and inertia properties
- Handle collisions and contact dynamics
- Make simulations more realistic
- Troubleshoot common physics problems

## 📚 Chapter Overview

1. **Physics Engines** - How simulation calculates physics
2. **Gravity and Forces** - What pulls and pushes robots
3. **Friction and Damping** - What slows movement
4. **Mass and Inertia** - How robots resist change
5. **Collisions** - When robots hit things

## ⚙️ Physics Engines

A **physics engine** calculates how objects move and interact based on physics laws.

### Popular Physics Engines

| Engine | Used By | Strengths |
|--------|---------|-----------|
| ODE | Gazebo (default) | Fast, stable |
| Bullet | Gazebo option | Accurate |
| DART | Gazebo option | Contact forces |
| PhysX | Unity, Isaac Sim | GPU acceleration |

### How Physics Engines Work

```
1. Read robot/world description
2. Calculate forces on each object
3. Update positions/velocities  
4. Detect collisions
5. Resolve contacts
6. Repeat (typically 1000 times/second)
```

### Real-Time vs Faster

- **real-Time**: 1 sim second = 1 real second
- **Faster**: Sim runs quicker (good for testing)
- **Slower**: Complex physics may run slower than real-time

## 🌍 Gravity and Forces

**Gravity** pulls objects downward. On Earth, acceleration = -9.81 m/s².

### Setting Gravity in Gazebo

```xml
<world name="my_world">
  <!-- Earth gravity -->
  <gravity>0 0 -9.81</gravity>
  
  <!-- Mars gravity (38% of Earth) -->
  <!-- <gravity>0 0 -3.71</gravity> -->
  
  <!-- Zero gravity (space) -->
  <!-- <gravity>0 0 0</gravity> -->
</world>
```

### Applied Forces

Robots experience many forces:

```
Total Force = Motor Force + Gravity + Friction + Collisions
```

**Example**: Wheel motor
- Motor applies 10N forward force
- Friction applies -2N resistance
- Net force: 8N forward
- Acceleration: F/m = 8N / 5kg = 1.6 m/s²

## 🛑 Friction and Damping

**Friction** opposes motion. Without it, robots would slide forever!

### Types of Friction

1. **Static Friction**: Prevents stationary object from moving
2. **Kinetic Friction**: Resists moving object
3. **Rolling Friction**: Wheels rolling (very low)

### Friction in URDF

```xml
<collision>
  <geometry>
    <cylinder radius="0.1" length="0.05"/>
  </geometry>
  <surface>
    <friction>
      <ode>
        <mu>1.0</mu>   <!-- Friction coefficient -->
        <mu2>1.0</mu2>
      </ode>
    </friction>
  </surface>
</collision>
```

**Friction coefficient (μ) examples:**
- Ice: 0.02-0.1 (very slippery)
- Wood on wood: 0.3-0.6
- Rubber on concrete: 0.7-1.0 (grippy)
- Metal on metal: 0.15-0.3

### Joint Damping

**Damping** slows joint movement (like air resistance).

```xml
<joint name="arm_joint" type="revolute">
  ...
  <dynamics damping="0.1" friction="0.05"/>
</joint>
```

Higher damping = slower, smoother movement

## ⚖️ Mass and Inertia

**Mass**: How much "stuff" in an object (kg)  
**Inertia**: Resistance to rotation

### Setting Mass

```xml
<inertial>
  <mass value="10.0"/>  <!-- 10 kg -->
  <origin xyz="0 0 0"/>  <!-- Center of mass -->
  
  <!-- Inertia tensor (how mass is distributed) -->
  <inertia ixx="0.4" ixy="0" ixz="0"
           iyy="0.4" iyz="0" 
           izz="0.2"/>
</inertial>
```

### Why Inertia Matters

```
Heavy wheel (high inertia):
- Hard to start spinning
- Hard to stop once spinning
- Smooth, stable motion

Light wheel (low inertia):
- Easy to start/stop
- Responsive
- Can be jerky
```

:::tip Quick Approximation
For simple shapes, use these formulas:
- **Box**: I = (1/12) * m * (h² + w²)
- **Cylinder**: I = (1/2) * m * r²
- **Sphere**: I = (2/5) * m * r²
:::

### Center of Mass

**Center of mass** is the balance point.

```
Robot with battery on left side:
├── Left: Heavy (battery)
└── Right: Light

Center of mass shifts LEFT
Robot tips left easier!
```

Set it correctly:
```xml
<origin xyz="-0.05 0 0"/>  <!-- 5cm to the left -->
```

## 💥 Collisions and Contact

**Collision detection** determines when objects touch.  
**Contact dynamics** calculates what happens next.

### Collision Shapes

Simple shapes = fast collision detection!

```xml
<!-- GOOD: Fast collision -->
<collision>
  <geometry>
    <box size="0.5 0.3 0.2"/>
  </geometry>
</collision>

<!-- BAD: Slow collision -->
<collision>
  <geometry>
    <mesh filename="complex_model_10000_triangles.stl"/>
  </geometry>
</collision>
```

### Contact Properties

```xml
<surface>
  <contact>
    <ode>
      <kp>1000000.0</kp>  <!-- Contact stiffness -->
      <kd>1.0</kd>         <!-- Contact damping -->
    </ode>
  </contact>
</surface>
```

**Stiffness (kp)**:
- High: Objects bounce (rigid collision)
- Low: Objects penetrate slightly (soft collision)

**Damping (kd)**:
- High: Energy absorbed (no bounce)
- Low: Bouncy collisions

## 📝 Chapter Summary

✅ **Physics engines** simulate real-world physics in robotics  
✅ **Gravity** affects all objects; can be configured  
✅ **Friction** opposes motion; crucial for realistic movement  
✅ **Mass and inertia** determine how robots accelerate and rotate  
✅ **Collisions** require proper geometry and contact properties  
✅ Realistic physics makes simulation match reality  

### Important Terms

- **Physics Engine**: Software that calculates object interactions
- **Gravity**: Force pulling objects downward
- **Friction**: Force opposing motion
- **Mass**: Amount of matter in an object
- **Inertia**: Resistance to changes in rotation
- **Collision**: When objects touch or overlap

## 🎯 Practice Exercises

1. Change gravity in Gazebo to Moon gravity (-1.62 m/s²)
2. Experiment with friction coefficients (0.1, 0.5, 1.0)
3. Create a heavy vs light robot and observe differences
4. Make a bouncy ball using contact properties

## ❓ Review Questions

1. Name three popular physics engines.
2. What is Earth's gravity acceleration?
3. How does friction coefficient affect movement?
4. Why is inertia important for rotation?
5. Why use simple collision shapes?

## 🚀 Next Steps

Great! You understand robot physics fundamentals.

Next, we explore **NVIDIA Isaac Sim** - an advanced GPU-accelerated simulator!

👉 **[Continue to Chapter 9: NVIDIA Isaac - Smart Brain for Robots](../09-nvidia-isaac/index.md)**

---

**Chapter 8 Complete!** ✅
