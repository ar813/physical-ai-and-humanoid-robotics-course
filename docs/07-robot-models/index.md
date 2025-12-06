---
sidebar_position: 7
title: Chapter 7 - How to Create Robot Models
description: Learn URDF and SDF formats for describing robot structure
---

# Chapter 7: How to Create Robot Models

Welcome to Chapter 7! To use a robot in simulation or control it in real life, you need to **describe its structure** - its body parts, joints, and how they connect. This chapter teaches you URDF and SDF, the languages for describing robots.

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Understand what URDF and SDF are
- Describe robot links (body parts)
- Define joints (connections between parts)
- Create visual and collision models
- Write a simple robot description file
- Load robots into Gazebo and RViz

## 📚 Chapter Overview

1. **What are URDF and SDF?** - Robot description languages
2. **Links** - Robot body parts
3. **Joints** - Connections and movement
4. **Visual vs Collision Models** - How robot looks vs behaves
5. **Creating Your First Robot** - Hands-on example

## 🤖 What are URDF and SDF?

**URDF (Unified Robot Description Format)** and **SDF (Simulation Description Format)** are XML-based languages that describe robots.

### URDF vs SDF

| Feature | URDF | SDF |
|---------|------|-----|
| Used by | ROS, ROS 2 | Gazebo, Isaac |
| Format | XML | XML |
| Complexity | Simpler | More features |
| Best for | Robot description | Full simulation worlds |

:::tip Which to Use?
- **URDF**: For ROS 2 robots  
- **SDF**: For Gazebo simulation  
- **Both work together**: URDF converts to SDF automatically!
:::

### What They Describe

- Robot links (body parts like base, wheels, arms)
- Joints (how parts connect and move)
- Visual appearance (colors, shapes, meshes)
- Collision shapes (for physics)
- Sensors (cameras, LiDAR)
- Inertial properties (mass, center of gravity)

## 🔗 Links - Robot Body Parts

A **link** is a rigid body part of the robot.

### Simple Link Example

```xml
<link name="base_link">
  <!-- Visual: How it looks -->
  <visual>
    <geometry>
      <box size="0.6 0.4 0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1"/>
    </material>
  </visual>
  
  <!-- Collision: For physics -->
  <collision>
    <geometry>
      <box size="0.6 0.4 0.2"/>
    </geometry>
  </collision>
  
  <!-- Inertial: Mass properties -->
  <inertial>
    <mass value="10.0"/>
    <inertia ixx="0.4" ixy="0" ixz="0" iyy="0.4" iyz="0" izz="0.2"/>
  </inertial>
</link>
```

### Common Geometries

```xml
<!-- Box -->
<box size="1 0.5 0.2"/>  <!-- length width height -->

<!-- Cylinder -->
<cylinder radius="0.1" length="0.5"/>

<!-- Sphere -->
<sphere radius="0.15"/>

<!-- Mesh (custom 3D model) -->
<mesh filename="package://my_robot/meshes/wheel.stl"/>
```

## 🔧 Joints - Connections

**Joints** connect links and define how they move.

### Joint Types

| Type | Movement | Example |
|------|----------|---------|
| `fixed` | No movement | Camera attached to robot |
| `revolute` | Rotation (limited angle) | Robot elbow |
| `continuous` | Rotation (unlimited) | Wheel |
| `prismatic` | Linear sliding | Elevator lift |

### Simple Joint Example

```xml
<joint name="wheel_joint" type="continuous">
  <!-- Parent link (doesn't move) -->
  <parent link="base_link"/>
  
  <!-- Child link (moves) -->
  <child link="wheel_link"/>
  
  <!-- Where child attaches to parent -->
  <origin xyz="0.2 0.15 0" rpy="0 0 0"/>
  
  <!-- Rotation axis -->
  <axis xyz="0 1 0"/>  <!-- Rotate around Y axis -->
</joint>
```

### Revolute Joint with Limits

```xml
<joint name="arm_joint" type="revolute">
  <parent link="base_link"/>
  <child link="arm_link"/>
  <origin xyz="0 0 0.2"/>
  <axis xyz="0 0 1"/>
  
  <!-- Joint limits -->
  <limit lower="-1.57" upper="1.57" effort="10" velocity="1.0"/>
  <!--  -90° to +90°,   max force,   max speed  -->
</joint>
```

## 👁️ Visual vs Collision Models

Robots have TWO shapes:

### Visual Model
- How the robot **looks**
- Can be complex and detailed
- Used for rendering/display
- Doesn't affect physics

### Collision Model  
- How the robot **interacts** physically
- Should be simple (boxes, cylinders)
- Used for physics calculations
- Affects performance!

```xml
<link name="robot_body">
  <!-- Complex visual (looks nice) -->
  <visual>
    <geometry>
      <mesh filename="detailed_robot.stl"/>
    </geometry>
  </visual>
  
  <!-- Simple collision (fast physics) -->
  <collision>
    <geometry>
      <box size="0.5 0.5 0.8"/>  <!-- Approximate shape -->
    </geometry>
  </collision>
</link>
```

:::tip Performance Tip
Use simple collision shapes! Complex meshes slow down simulation drastically.
:::

## 🛠️ Creating Your First Robot

Let's create a simple two-wheeled robot!

### Complete URDF Example

```xml
<?xml version="1.0"?>
<robot name="simple_robot">

  <!-- BASE LINK -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.4 0.3 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.4 0.3 0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="5.0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" 
               iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>

  <!-- LEFT WHEEL -->
  <link name="left_wheel">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="black">
        <color rgba="0.1 0.1 0.1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.01" ixy="0" ixz="0" 
               iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <!-- LEFT WHEEL JOINT -->
  <joint name="left_wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="left_wheel"/>
    <origin xyz="0.15 0.175 0" rpy="1.57 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

  <!-- RIGHT WHEEL (similar to left) -->
  <link name="right_wheel">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
      <material name="black">
        <color rgba="0.1 0.1 0.1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.01" ixy="0" ixz="0" 
               iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <!-- RIGHT WHEEL JOINT -->
  <joint name="right_wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="right_wheel"/>
    <origin xyz="0.15 -0.175 0" rpy="1.57 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

</robot>
```

### Viewing in RViz

```bash
# View URDF in RViz
ros2 launch urdf_tutorial display.launch.py model:=simple_robot.urdf
```

### spawning in Gazebo

```bash
# Spawn robot in Gazebo
ros2 run gazebo_ros spawn_entity.py -entity my_robot -file simple_robot.urdf
```

## 📝 Chapter Summary

✅ **URDF/SDF** describe robot structure in XML format  
✅ **Links** are rigid body parts of the robot  
✅ **Joints** connect links and define movement  
✅ **Visual models** define appearance  
✅ **Collision models** define physics interaction  
✅ Simple URDF files can create functional robots  

### Important Terms

- **URDF**: Unified Robot Description Format
- **SDF**: Simulation Description Format
- **Link**: Rigid body part of a robot
- **Joint**: Connection between links
- **Visual Geometry**: How robot looks
- **Collision Geometry**: How robot physically interacts

## 🎯 Practice Exercises

1. Create a URDF file for a simple box robot
2. Add a third wheel to the two-wheeled robot
3. Create a robot arm with 2 revolute joints
4. Visualize your robot in RViz

## ❓ Review Questions

1. What's the difference between URDF and SDF?
2. Name the four main joint types.
3. Why use simple collision geometries?
4. What three components does a link have?
5. How do you connect two links?

## 🚀 Next Steps

Excellent! You can now describe robots in URDF/SDF.

Next, we'll learn about **robot physics** and how robots move realistically!

👉 **[Continue to Chapter 8: How Robots Move and Feel Physics](../08-robot-physics/index.md)**

---

**Chapter 7 Complete!** ✅
