---
sidebar_position: 10
title: Chapter 10 - Robot Vision, Mapping, and Navigation  
description: Learn computer vision, SLAM, and autonomous navigation for robots
---

# Chapter 10: Robot Vision, Mapping, and Navigation

Welcome to Chapter 10! For robots to move autonomously, they need to **see, understand, and navigate** their environment. This chapter covers computer vision, SLAM (mapping + localization), and path planning.

## 🎯 Learning Objectives

- Understand computer vision for robots
- Learn SLAM (Simultaneous Localization and Mapping)
- Explore path planning algorithms
- Understand obstacle avoidance
- Navigate robots autonomously

## 📚 Chapter Overview

1. **Computer Vision Basics**
2. **SLAM - Creating Maps**
3. **Localization - Where Am I?**
4. **Path Planning - Getting There**
5. **Obstacle Avoidance**

## 👁️ Computer Vision

**Computer vision** lets robots understand what they see through cameras.

### Common Vision Tasks

| Task | Description | Example |
|------|-------------|---------|
| **Object Detection** | Find objects in images | Detect person, cup, chair |
| **Segmentation** | Label each pixel | Road vs sidewalk vs sky |
| **Depth Estimation** | Calculate distance | How far is that wall? |
| **Tracking** | Follow objects over time | Track moving person |

### Using OpenCV (Python)

```python
import cv2

# Read image
image = cv2.imread('robot_view.jpg')

# Convert to grayscale  
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect edges
edges = cv2.Canny(gray, 100, 200)

# Find contours (object outlines)
contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
```

## 🗺️ SLAM - Simultaneous Localization and Mapping

**SLAM** solves two problems at once:
1. **Mapping**: Build a map of the environment
2. **Localization**: Know where you are on that map

### The SLAM Problem

```
Robot Problem:
- Need map to know where you are
- Need to know where you are to build map
- Chicken and egg paradox!

SLAM Solution:
- Do both simultaneously!
```

### Types of SLAM

**1. 2D SLAM** (flat environments)
- Uses laser scanners (LiDAR)
- Creates 2D grid maps
- Fast and efficient
- Example: gmapp ing, Cartographer

**2. 3D SLAM** (full 3D environments)
- Uses cameras, depth sensors
- Creates 3D point clouds
- More complex
- Example: ORB-SLAM, RTAB-Map

### ROS 2 SLAM Example

```bash
# Install SLAM Toolbox
sudo apt install ros-humble-slam-toolbox

# Run SLAM
ros2 launch slam_toolbox online_async_launch.py

# Save map when done
ros2 run nav2_map_server map_saver_cli -f my_map
```

## 📍 Localization - Where Am I?

**Localization** determines the robot's position and orientation.

### Methods

**1. Odometry** (dead reckoning)
- Track wheel rotations
- ± Accumulates errors over time

**2. GPS** (outdoor only)
- ± Satellite-based positioning
- ✅ Global reference
- ❌ Doesn't work indoors
- ❌ ±3-5m accuracy (not precise)

**3. Visual Localization**
- Match current view to known landmarks
- ✅ Works indoors
- ✅ No GPS needed

**4. Particle Filter (Monte Carlo Localization)**
- Maintains multiple position hypotheses
- Updates based on sensor data
- Standard ROS 2 approach

### AMCL (Adaptive Monte Carlo Localization)

```bash
# Run localization with existing map
ros2 launch nav2_bringup localization_launch.py \
  map:=my_map.yaml
```

## 🛣️ Path Planning

**Path planning** finds a route from current position to goal.

### Global Planning
Finds overall path from start to goal.

**Common Algorithms:**
- **A***: Optimal path, widely used
- **Dijkstra**: Guaranteed shortest path
- **RRT**: Good for complex spaces

### Local Planning
Adjusts path in real-time for obstacles.

**Approaches:**
- **DWA** (Dynamic Window Approach): Fast, smooth
- **TEB** (Timed Elastic Band): Optimized trajectories

### ROS 2 Navigation Stack

```bash
# Full autonomous navigation
ros2 launch nav2_bringup navigation_launch.py \
  map:=my_map.yaml

# Send navigation goal
ros2 topic pub /goal_pose geometry_msgs/PoseStamped "..."
```

## 🚧 Obstacle Avoidance

Robots must avoid obstacles not on the map!

### Costmap

Nav2 uses **costmaps** - grids showing obstacle costs:
- **0**: Free space (safe)
- **100-253**: Inflated obstacles (dangerous zone)
- **254**: Obstacle (collision!)
- **255**: Unknown

### Reactive Avoidance

```python
# Simple obstacle avoidance logic
if obstacle_ahead < 0.5:  # Within 50cm
    turn_away()
elif obstacle_ahead < 1.0:  # Within 1m
    slow_down()
else:
    move_normally()
```

## 📝 Chapter Summary

✅ **Computer vision** enables robots to perceive environments  
✅ **SLAM** simultaneously maps and localizes robots  
✅ **Localization** determines robot position  
✅ **Path planning** finds routes to goals  
✅ **Obstacle avoidance** ensures safe navigation  
✅ ROS 2 Nav2 provides complete navigation stack  

## 🚀 Next Steps

Excellent! Now you understand robot navigation.

Next, we explore **humanoid robot movement**!

👉 **[Continue to Chapter 11: How Humanoid Robots Move](../11-humanoid-movement/index.md)**

---

**Chapter 10 Complete!** ✅
