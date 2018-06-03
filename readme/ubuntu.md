---
layout: page
title: ubuntu
---

# ubuntu

[fstab remount](./ubuntu.html#fstab)
[network 확인](./ubuntu.html#network)  
[fileserver 확인](./ubuntu.html#fileserver)  
[booting 디스크 만들기](./ubuntu.html#booting-disk)  
[fdisk](./ubuntu.html#fdisk)  


## fstab

`/etc/fstab` 파일의 내용은 다음과 같다. options 값이 바뀌었음. 

```bash
jinia@jin:~$ sudo cat /etc/fstab
[sudo] password for jinia: 
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda1 during installation
UUID=d42a2744-2672-475f-9d6c-4223d2fdbb49 /               ext4    errors=remount-ro,noatime,discard        0       1
# /boot was on /dev/sda5 during installation
UUID=3bad1527-e2dc-4ecf-b2f1-9f15b6eeb8b7 /boot           ext4    errors=remount-ro,noatime,discard        0       2
# /home was on /dev/sda7 during installation
UUID=51c5417b-ca30-4c74-b028-381319f0fa51 /home           ext4    errors=remount-ro,noatime,discard        0       2
# swap was on /dev/sda6 during installation
UUID=08502cb2-b326-42fe-90ba-923e45913273 none            swap    sw              0       0
```


## network

회사에서 ping이 나가는지만 체크하면 될듯. 
```
ping 192.168.41.1
ping www.solutionpot.co.kr
```

`/etc/netplan/01-netcfg.yaml` 파일에 네트워크 설정 정보는 들어가 있음.  
nameservers의 addresses는 xxx.xxx.xxx.xxx 로 되어있으니, 적당히 본인이 사용하는 DNS ip를 적길.. 

```bash
jinia@jin:~$ cat /etc/netplan/01-netcfg.yaml 
# This file describes the network interfaces available on your system
# For more information, see netplan(5).
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      addresses: [ 192.168.41.81/24 ]
      gateway4: 192.168.41.1
      nameservers:
              addresses: [ xxx.xxx.xxx.xxx, xxx.xxx.xxx.xxx ]
jinia@jin:~$ 
```

## fileserver

윈도우에서는 탐색기에서 네트워크 드라이브로 다음과 같이 연결해서 사용했는데. ubuntu는 없는지라.. 

```
\\xxx.xxx.xxx.xxx\swdev
```
다음과 같이 ssh로 연결해서 사용하면 된다. 파일 서버 IP는 203. 어쩌고였음. 

```
ssh fxxxxx@xxx.xxx.xxx.xxx
cd /media/data/swdev
```



## booting disk

Startup Disk Creator 

iso 파일만 있다면
ubuntu에서 만들꺼라면
tutorial 따라 만들면 된다.

https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-ubuntu#0


## fdisk

```bash
jinia@jin:~$ sudo fdisk -l
Disk /dev/loop0: 86.6 MiB, 90759168 bytes, 177264 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/loop1: 86.6 MiB, 90812416 bytes, 177368 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/sda: 238.5 GiB, 256060514304 bytes, 500118192 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: B33E3F59-5341-488A-8E58-1952A899BBB7

Device       Start       End   Sectors  Size Type
/dev/sda1     2048   1050623   1048576  512M EFI System
/dev/sda2  1050624 500115455 499064832  238G Linux filesystem
jinia@jin:~$ 
```

```bash
jinia@jin:~$ sudo fdisk -l
Disk /dev/loop0: 86.6 MiB, 90759168 bytes, 177264 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/loop1: 86.6 MiB, 90812416 bytes, 177368 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/sda: 238.5 GiB, 256060514304 bytes, 500118192 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: B33E3F59-5341-488A-8E58-1952A899BBB7

Device       Start       End   Sectors  Size Type
/dev/sda1     2048   1050623   1048576  512M EFI System
/dev/sda2  1050624 500115455 499064832  238G Linux filesystem


Disk /dev/sdb: 3.8 GiB, 4009754624 bytes, 7831552 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x1c0522c6

Device     Boot   Start     End Sectors  Size Id Type
/dev/sdb1  *          0 1650687 1650688  806M  0 Empty
/dev/sdb2       1575508 1580179    4672  2.3M ef EFI (FAT-12/16/32)
jinia@jin:~$ 
```
