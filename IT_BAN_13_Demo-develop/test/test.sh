#!/bin/bash
NAME="jmeter"
JMETER_VERSION=${JMETER_VERSION:-"5.4"}
IMAGE="justb4/jmeter:${JMETER_VERSION}"

T_DIR=test/press1
R_DIR=${T_DIR}/report
JMX_NAME=ThreadGroup

# Reporting dir: start fresh
rm -rf ${R_DIR} > /dev/null 2>&1
mkdir -p ${R_DIR}

/bin/rm -f ${T_DIR}/test-plan.jtl ${T_DIR}/jmeter.log  > /dev/null 2>&1

# **執行jmeter**
docker run --rm --name ${NAME} -i -v ${PWD}:${PWD} -w ${PWD} ${IMAGE} \
-Dlog_level.jmeter=DEBUG  -n -t ${PWD}/${T_DIR}/${JMX_NAME}.jmx -l ${PWD}/${T_DIR}/${JMX_NAME}.jtl \
-j ${PWD}/${T_DIR}/${JMX_NAME}.log -e -o ${PWD}/${R_DIR}

echo "==== jmeter.log ===="
cat ${T_DIR}/${JMX_NAME}.log

echo "==== Raw Test Report ===="
cat ${T_DIR}/${JMX_NAME}.jtl

echo "==== HTML Test Report ===="
echo "See HTML test report in ${R_DIR}/index.html"