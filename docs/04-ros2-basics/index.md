---
sidebar_position: 4
title: Chapter 4 - Getting Started with ROS 2
description: Learn the basics of ROS 2, the industry-standard Robot Operating System
---

# Chapter 4: Getting Started with ROS 2

Welcome to Chapter 4! You've learned about robot intelligence and sensors - now it's time to learn **ROS 2 (Robot Operating System 2)**, the software framework that professional roboticists use worldwide. Think of ROS 2 as the "language" robots use to make all their parts work together!

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Explain what ROS 2 is and why it's important
- Understand ROS 2 architecture (nodes, topics, services)
- Identify the key components of a ROS 2 system
- Navigate ROS 2 using basic command-line tools
- Understand how robots communicate using ROS 2
- Set up a basic ROS 2 workspace

## 📚 Chapter Overview

This chapter is divided into the following sections:

1. **What is ROS 2?** - Understanding the framework
2. **Why Use ROS 2?** - Benefits for robotics
3. **ROS 2 Architecture** - How it's organized
4. **Nodes** - Building blocks of ROS 2
5. **Topics** - How nodes communicate
6. **Services** - Request-response communication
7. **Getting Started** - Basic ROS 2 commands

## 🤖 What is ROS 2?

**ROS 2 (Robot Operating System 2)** is an open-source software framework for building robot applications. Despite its name, it's not actually an operating system like Windows or Linux - it's more like a toolkit that runs on top of an operating system.

### ROS 2 is NOT...

❌ A programming language (it uses Python, C++, etc.)  
❌ An operating system (it runs on Linux, Windows, macOS)  
❌ A simulation tool (though it works with simulators)  
❌ Hardware (it's pure software)

### ROS 2 IS...

✅ A framework for robot software development  
✅ A set of libraries and tools  
✅ A communication system for robot parts  
✅ An ecosystem of packages (pre-built robot code)  
✅ Industry standard used by thousands of robots

:::tip Simple Analogy
If building a robot is like building a house:
- **Hardware** = Bricks, wood, windows (physical parts)
- **Operating System** = The foundation
- **ROS 2** = Blueprint, plumbing system, electrical wiring (how everything connects)
- **Your code** = Interior design (making it do what you want)
:::

### RO S vs ROS 2

You might hear about "ROS" (ROS 1). Here's the difference:

| Feature | ROS 1 | ROS 2 |
|---------|-------|-------|
| Release | 2007 | 2017 |
| Status | Maintenance only | Active development |
| Real-time | No | Yes |
| Security | Basic | Advanced |
| Multi-robot | Difficult | Easy |
| Windows/Mac | Limited | Full support |
| Future | Being phased out | The future! |

**We'll focus on ROS 2** because it's the modern, recommended version.

## 🎯 Why Use ROS 2?

Why do professional roboticists love ROS 2? Here are the main reasons:

### 1. **Modular Design**
Break your robot into small, manageable pieces that work together.

**Example:**
Instead of one giant program:
- Camera node (handles vision)
- Navigation node (plans paths)
- Motor node (controls movement)
- Safety node (emergency stop)

Each piece is simple, testable, and reusable!

### 2. **Hardware Abstraction**
Write code once, use on different robots!

```
Your Code → ROS 2 → Any Robot Hardware
```

Switch from simulation to real robot without changing your code!

### 3. **Huge Ecosystem**
Thousands of free, pre-built packages:
- Navigation (move from A to B)
- SLAM (create maps)
- Vision (object detection)
- Manipulation (robot arms)
- And much more!

Don't reinvent the wheel - use proven code!

### 4. **Multi-Language Support**
Write in Python OR C++ (or both!)
- **Python**: Easier to learn, great for prototyping
- **C++**: Faster, better for real-time performance

### 5. **Powerful Tools**
- **RViz**: 3D visualization of robot
- **rqt**: GUI tools for debugging
- **rosbag**: Record and replay robot data
- **Gazebo integration**: Simulation support

### 6. **Industry Standard**
Used by:
- Boston Dynamics (Atlas, Spot)
- NASA (Mars rovers)
- Self-driving car companies
- Thousand of universities and companies

Learning ROS 2 = career opportunities!

## 🏗️ ROS 2 Architecture

ROS 2 is built on several core concepts. Let's understand each one!

### The Big Picture

```
┌─────────────────────────────────────────────┐
│                ROS 2 SYSTEM                  │
├─────────────────────────────────────────────┤
│                                              │
│   ┌──────┐    ┌──────┐    ┌──────┐         │
│   │Node 1│◄───┤Topic │───►│Node 2│         │
│   └──────┘    └──────┘    └──────┘         │
│       ▲                        │            │
│       │     ┌─────────┐        │            │
│       └─────┤Service  │◄───────┘            │
│             └─────────┘                     │
│                                              │
└─────────────────────────────────────────────┘
```

Core components:
1. **Nodes** - Programs that do specific tasks
2. **Topics** - Streams of data between nodes
3. **Services** - Request-response communication
4. **Actions** - Long-running tasks (advanced)
5. **Parameters** - Configuration values

Let's understand each one!

## 🔷 Nodes - Building Blocks

A **node** is a process that performs a specific task in your robot system.

### What is a Node?

Think of nodes as specialized workers in a factory:
- Camera node: "I capture images"
- Object detector node: "I find objects in images"  
- Navigator node: "I plan paths"
- Motor controller node: "I move the wheels"

Each node does ONE job well!

### Node Examples

**Simple Robot System:**
```
┌──────────────┐
│ Camera Node  │ → Takes pictures
└──────┬───────┘
       │ (publishes images)
       ▼
┌──────────────┐
│ Vision Node  │ → Finds objects
└──────┬───────┘
       │ (publishes object locations)
       ▼
┌──────────────┐
│ Planner Node │ → Decides where to go
└──────┬───────┘
       │ (publishes movement commands)
       ▼
┌──────────────┐
│ Motor Node   │ → Moves robot
└──────────────┘
```

### Benefits of Nodes

✅ **Modularity**: Each node is independent  
✅ **Reusability**: Use same node in different robots  
✅ **Testability**: Test each node separately  
✅ **Parallel**: Multiple nodes run at the same time  
✅ **Fault isolation**: If one crashes, others keep running  

:::note Think About It
Instead of one big program that crashes completely if any part fails, you have many small programs. If camera node crashes, motor control keeps working!
:::

## 📡 Topics - Data Streams

**Topics** are named channels where nodes send and receive messages. Think of them like radio stations!

### How Topics Work

```
    PUBLISHERS                TOPIC                SUBSCRIBERS
    (Senders)              (Radio Station)         (Listeners)

┌──────────────┐                              ┌──────────────┐
│Camera Node   │──┐                       ┌──│Vision Node   │
└──────────────┘  │                       │  └──────────────┘
                  │   /camera/image       │
┌──────────────┐  ├──────────────────────►├──┌──────────────┐
│Camera Node 2 │──┘    (Topic name)       └──│Display Node  │
└──────────────┘                              └──────────────┘
```

**Key points:**
- Topics have **names** (like /camera/image)
- One or more nodes can **publish** (send) to a topic
- One or more nodes can **subscribe** (listen) to a topic
- Publishers and subscribers don't know about each other!

### Topic Example

**Topic**: `/robot/battery_level`  
**Message Type**: Float (number)  
**Publisher**: Battery monitoring node  
**Subscribers**: Display node, low-battery warning node, charging node

```python
# Publisher (simplified)
battery_publisher.publish(battery_level=87.5)

# Subscriber receives:
# "Battery is at 87.5%"
```

### Common Topic Names

| Topic | Data | Purpose |
|-------|------|---------|
| /camera/image | Image | Camera pictures |
| /scan | LaserScan | LiDAR data |
| /odom | Odometry | Robot position |
| /cmd_vel | Twist | Movement commands |
| /battery | Float | Battery level |

### Topics Are:

- **Asynchronous**: No waiting for response
- **Many-to-many**: Multiple publishers and subscribers  
- **Continuous**: Stream of data, not one-time
- **Typed**: Each topic has a specific message type

## 🔧 Services - Request-Response

**Services** are for request-response communication - like asking a question and getting an answer.

### Topics vs Services

| Aspect | Topic | Service |
|--------|-------|---------|
| Pattern | Continuous stream | One request, one response |
| Direction | One-way | Two-way |
| Use case | Sensor data | Commands, calculations |
| Example | Publishing images | "Take a picture now!" |

### Service Example

**Service**: `/calculate_distance`  
**Request**: Two points (A and B)  
**Response**: Distance between them

```
Client Node                    Server Node
     │                              │
     │  "Distance from (0,0)        │
     │   to (3,4)?"                 │
     ├──────────────────────────────►
     │                              │
     │                         (calculates)
     │                              │
     │        "5.0 meters"          │
     ◄──────────────────────────────┤
     │                              │
```

### When to Use Services

Use services when you need:
- ✅ A response to a request
- ✅ One-time operations (not continuous)
- ✅ Confirmation that something happened

**Examples:**
- Take a picture on command
- Enable/disable a feature
- Get current robot position
- Clear a map

### Common Services

- `/set_parameters`: Change configuration
- `/get_map`: Request the current map
- `/trigger_capture`: Take a picture
- `/reset_odometry`: Reset position tracking

## 🛠️ Getting Started with ROS 2 Commands

Let's learn the basic commands to interact with ROS 2!

### Essential ROS 2 Commands

#### 1. List Running Nodes
```bash
ros2 node list
```
**Output:**
```
/camera_node
/motor_controller
/navigation
```

#### 2. Get Node Information
```bash
ros2 node info /camera_node
```
**Output:**
```
Publishers:
  /camera/image
Subscribers:
  /camera/settings
Services:
  /camera/capture
```

#### 3. List Topics
```bash
ros2 topic list
```
**Output:**
```
/camera/image
/cmd_vel
/odom
/scan
```

#### 4. See Topic Messages
```bash
ros2 topic echo /camera/image
```
Shows live data being published to the topic!

#### 5. Get Topic Info
```bash
ros2 topic info /cmd_vel
```
**Output:**
```
Type: geometry_msgs/msg/Twist
Publisher count: 1
Subscription count: 2
```

#### 6. Publish to a Topic
```bash
ros2 topic pub /led_control std_msgs/msg/Bool "{data: true}"
```
Manually send a message to a topic!

#### 7. List Services
```bash
ros2 service list
```

#### 8. Call a Service
```bash
ros2 service call /take_picture std_srvs/srv/Trigger
```

### Useful Inspection Commands

```bash
# Check ROS 2 installation
ros2 doctor

# Show topic publication rate
ros2 topic hz /camera/image

# Show message type details
ros2 interface show geometry_msgs/msg/Twist
```

## 📦 ROS 2 Workspace

A **workspace** is a directory where you organize your ROS 2 projects.

### Workspace Structure

```
my_robot_workspace/
├── src/                    # Source code goes here
│   ├── package_1/
│   ├── package_2/
│   └── package_3/
├── build/                  # Build files (auto-generated)
├── install/                # Installed files (auto-generated)
└── log/                    # Log files (auto-generated)
```

**You only edit files in `src/`!** The rest is auto-generated.

### Creating a Workspace

```bash
# Create workspace folder
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws

# Build the workspace
colcon build

# Source the workspace
source install/setup.bash
```

:::tip Important!
You need to `source install/setup.bash` every time you open a new terminal to use your workspace!
:::

## 📝 Chapter Summary

Let's review what we learned:

### Key Points

✅ **ROS 2** is a framework for building robot software, not an OS  
✅ ROS 2 provides **modularity**, **reusability**, and a huge **ecosystem**  
✅ **Nodes** are independent programs that perform specific tasks  
✅ **Topics** enable continuous data streaming between nodes  
✅ **Services** provide request-response communication  
✅ Basic **CLI commands** let you inspect and interact with ROS 2 systems  
✅ A **workspace** organizes your ROS 2 projects  

### Important Terms

- **ROS 2**: Robot Operating System 2, a framework for robotics
- **Node**: A process that performs a specific computation
- **Topic**: Named channel for asynchronous data streaming
- **Service**: Synchronous request-response communication
- **Publisher**: Node that sends messages to a topic
- **Subscriber**: Node that receives messages from a topic
- **Workspace**: Directory structure for ROS 2 projects

## 🎯 Practice Exercises

Test your understanding with these exercises:

### Exercise 1: Identify Communication Pattern
For each scenario, decide if you should use a Topic or Service:

a) Continuously streaming camera images  
b) Asking robot for its current battery level (one time)  
c) Sending movement commands to motors  
d) Requesting to take a single photo  
e) Publishing LiDAR scan data  

### Exercise 2: Design Node Architecture
You're building a delivery robot. Sketch a system with:
- At least 4 nodes
- Topics connecting them
- What each node does

### Exercise 3: Command Practice
What command would you use to:
a) See all running nodes?  
b) View live data from /camera/image topic?  
c) Get information about the /motor_control node?  

## ❓ Review Questions

1. What is ROS 2 and what is it used for?
2. What's the difference between ROS 1 and ROS 2?
3. Explain what a node is in your own words.
4. What's the difference between topics and services?
5. Why is modularity important in robotics?
6. What command shows you all active topics?

## 🔍 Common Mistakes

### Mistake 1: Thinking ROS 2 is an operating system
**Reality**: ROS 2 is a framework that runs ON TOP of Linux/Windows/macOS. It's software, not an OS.

### Mistake 2: Making one giant node for everything
**Reality**: Break functionality into small, focused nodes. Each node should do ONE thing well.

### Mistake 3: Using services for continuous data
**Reality**: Use topics for streaming data (sensor readings). Services are for one-time requests.

## 🛠️ Troubleshooting

**Q: I get "command not found" when running ros2 commands.**  
A: You haven't sourced ROS 2! Run: `source /opt/ros/humble/setup.bash` (adjust for your ROS 2 version)

**Q: My nodes can't find each other.**  
A: Make sure all nodes are using the same ROS_DOMAIN_ID. Check with: `echo $ROS_DOMAIN_ID`

**Q: Is ROS 2 hard to learn?**  
A: The basics are straightforward! Start simple (basic topics and nodes) and gradually add complexity.

## 🚀 Next Steps

Congratulations! You now understand the fundamentals of ROS 2 architecture and basic commands.

In the next chapter, we'll **write our first ROS 2 programs** in Python and create working robot nodes!

👉 **[Continue to Chapter 5: Making Robot Programs in ROS 2](../05-ros2-programming/index.md)**

---

## 📚 Additional Resources

- [Official ROS 2 Documentation](https://docs.ros.org)
- [ROS 2 Tutorials](https://docs.ros.org/en/humble/Tutorials.html)
- [The Construct (ROS 2 Learning Platform)](https://www.theconstructsim.com/)

## 💬 Discussion Questions

Share your thoughts in the community forum:

1. Why do you think ROS 2 has become the industry standard?
2. Can you think of a robot application where using one giant program might be better than many nodes?
3. What robot do you want to build with ROS 2?

---

**Chapter 4 Complete!** ✅  
**Next**: Chapter 5 - Making Robot Programs in ROS 2
